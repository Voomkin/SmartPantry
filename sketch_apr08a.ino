#include <HX711.h>
#include <LiquidCrystal.h>

#define LOADCELL_DOUT_PIN  2
#define LOADCELL_SCK_PIN  4
#define GREEN_LED 53
#define YELLOW_LED 52

HX711 scale;
const int rs = 31, en = 30, d4 = 39, d5 = 37, d6 = 35, d7 = 33;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

float calibration_factor = -234500; // -234500 calibrated

void setup() {
  Serial.begin(9600);
  lcd.begin(16,2);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale();
  scale.tare();  //Reset the scale to 0
}

 int weight_count = 0;
 double prev_weight = 0;

void loop() {

  scale.set_scale(calibration_factor); //Adjust to this calibration factor
  double weight = abs(scale.get_units());

//  Serial.print("PREV_WEIGHT: ");
//  Serial.print(prev_weight);
//
//  Serial.print(" WEIGHT: ");
//  Serial.print(weight);
//
//  Serial.print(" Equal? ");
//  Serial.println(abs(weight - prev_weight) < 0.01);

  if (weight > 0.01)
  {
    // Serial.print(weight);
    digitalWrite(GREEN_LED, HIGH);
    digitalWrite(YELLOW_LED, LOW);

    lcd.clear();
    String text = (String) weight;
    lcd.print(text);
    lcd.print(" lbs.");

    if(abs(weight - prev_weight) < 0.01) {
      weight_count += 1;
    }
    else {
      weight_count = 0;
    }
    
   if(weight_count == 8) {
      //Send to ESP32
      Serial.print(weight);
   }

  } else {
    lcd.clear();
    digitalWrite(GREEN_LED, LOW);
    digitalWrite(YELLOW_LED, HIGH);

    String text = "0.00";
    lcd.print(text);
    lcd.print(" lbs.");
  }

  prev_weight = weight;

  delay(200);
  
  
  // if(weigh_count >= 20)
  // {
  //   //Call function to send via Bluetooth
  //   weigh_count = 0;
  // }
  
  // if(prev_weight == weight)
  // {
  //   weigh_count += 1;
  // }
  // else
  // {
  //   weigh_count = 0;
  // }
  
  // prev_weight = weight;
}
