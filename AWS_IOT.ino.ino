
#include <WiFiClientSecure.h>
#include <MQTTClient.h> //MQTT Library Source: https://github.com/256dpi/arduino-mqtt

#include <ArduinoJson.h> //ArduinoJson Library Source: https://github.com/bblanchon/ArduinoJson
#include <WiFi.h>

// MQTT topics for the device
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"
#define THINGNAME "esp32_devkit_vi"
#define RXD2 17
#define TXD2 16

WiFiClientSecure wifi_client = WiFiClientSecure();
MQTTClient mqtt_client = MQTTClient(256); //256 indicates the maximum size for packets being published and received.

uint32_t t1;

//begin config.h stuff
char* WIFI_SSID = "Verizon-SM-G930V-DE2F";
char* WIFI_PASSWORD = "terf322$";
char* AWS_IOT_ENDPOINT = "a1wkqcakgi8bo-ats.iot.us-east-1.amazonaws.com";

// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";

// Device Certificate
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
MIIDWTCCAkGgAwIBAgIUdSckBGfezdNtEx/1DY8aEGNbl24wDQYJKoZIhvcNAQEL
BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g
SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTIyMDQxNDIwMDMz
OVoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0
ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAPKu1YiNSShbwyZTv3Gh
FaMrcrAPLHFvX0BnDlfmwp06pyxeMw/DxGS4kFKM1Y3q09lrPiS5v1QmeXy4TfWk
1OlKMJbpe4HpzLmy9Pwq5EQJn7B7WuBCTT6tMDJay00YENnD7RGZVpX9v+ZB2piX
FcN4/PJ/Sviq5mpsSGR7GZqInhh9LbpfggdGGVWj3ZFSf5Qvm39P8b5P4dTkA9b8
r8s81h/BXd7uQoJzeKyK/3gp0ux8n88BusjqwxxG2Ra0upMsjeuIt9ouhBo3NN3X
7YqVoeOeppk5b8UvIRTCM2KvSqt72CsvfkoDSReC08OrJj8oZ4O+bHP99eA0DgQP
uZsCAwEAAaNgMF4wHwYDVR0jBBgwFoAUe1MvUDAy/zADHw4gPZNShsPXZakwHQYD
VR0OBBYEFLLWcEjf4dI9J27PjrU54hAZYoNnMAwGA1UdEwEB/wQCMAAwDgYDVR0P
AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQBQX8natnnX+1uwX2WBcRHionT2
puYNFMlQbeJnfFNFIJgrPMP3r8qJ1e6mso75LzaSVaOYOP8MxAOk0moV+hyV/Wzg
tqxiCnKhDWKvC7N2wiofRk1BVHznaZDMJgHvesJEsCaNjQ7JWDu/hysf76j6LCs5
8cvOGD4KXvgmgs8+Bg2hKCWvT5OzdYwz7CmdEEOZaWOfeAL+GubAZIN/WmfQsvm2
og49zSEFQmb+zcf1imNuhZWbllM4SJVYaxnKBrsDCk5kUDVZDTfyQoVeYWHu3TIl
Lp9rxGiEqlPgepN7rY/oEC/QHGKQ6flQmAsTwO7j1tKvundKXFwFw9O3NbOL
-----END CERTIFICATE-----
)KEY";

// Device Private Key
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA8q7ViI1JKFvDJlO/caEVoytysA8scW9fQGcOV+bCnTqnLF4z
D8PEZLiQUozVjerT2Ws+JLm/VCZ5fLhN9aTU6Uowlul7genMubL0/CrkRAmfsHta
4EJNPq0wMlrLTRgQ2cPtEZlWlf2/5kHamJcVw3j88n9K+KrmamxIZHsZmoieGH0t
ul+CB0YZVaPdkVJ/lC+bf0/xvk/h1OQD1vyvyzzWH8Fd3u5CgnN4rIr/eCnS7Hyf
zwG6yOrDHEbZFrS6kyyN64i32i6EGjc03dftipWh456mmTlvxS8hFMIzYq9Kq3vY
Ky9+SgNJF4LTw6smPyhng75sc/314DQOBA+5mwIDAQABAoIBACJJNxvasipEhJam
oFaCZpct7T8YdbP1AyULKkia7oXeIn4vNNGWW+nK9YDkKsupEJMYBqiToYdXBDTt
qP36cqYe+CxqAiwBhw35TYlO2f8OyQPa+aTTWSxwtW13zF8w9jh96MFiw4vfVLxI
M4T5W3bJYhs0hrgJFRKWB8hCaASf4Bs3xovxVlw0Q4yDEfO2o5RvBGGy8Pcf/wIp
qnDhetUQEKRPnwHiDpsPaUSqqSKJqDH+YNvH29Kd3w/9M2CiloEoaL/Bys5s6zdn
FtHjjyS9EdZ7/SI2oxyX9M8jPEvKh2a+l4gG/LcHBRnFkCM7gOEd4xKPLOuq4JFx
mb/9lHECgYEA/y9xgzlAnP2S9VkaXfOeSmfJIzkLAEGylZPvr/lsoGujErr2gZJX
2p3lfXN5vTwLJK87Kf3y8rRlSZRKFA2nr8+1KFqymv7xSFt6EaTo3CNdqRRMNCc2
DEbDWKwzn/VWhYh6rJPXS36g8USvXwLwN082eJDtS/Ru6HgdglrvrCMCgYEA83Us
PigYRzs6p29YaLqUn+xgeaMa3wP74XEu0NKkxuQYreZ1OTZ3eyISmnpK95r1/S+q
D0NPb3Pj9Z9tH8h99K3gBbPvc3lXrO4l5IP9Y59W+lfGB4yzXTYP8zvY/pC99ZHg
V/NKPi9z0ERxsUgbyK6P6csiUXDiBRNP8GV8uCkCgYA/qreYdM1RHdbvjbaNYD3K
9I/zUMUU4E9NEGbJseJPN+usvabI9xkiOyjJnujttLBXC70oIerecPGgZPYCgNGo
hJr/IXnUP+01D1WqV0mdutkgWScWD/5lG7abRgNvUkeu8zkgG5aoiERhTbCvdM04
D3RYqlf6DlcpeuZp4oRPnwKBgQDKY/Rdz9MvFEwUeXoTxlhcApPJSxDBqXwx1HfI
3fRh66mgl9+HqoH1eUPh7Bx6bvZkfsVvXtOgocU2okyDiZc8W3fLBeTgKFX8yxXx
PNDfis0x3Noh2JQbvx/PY0dniUiB572LIBPuUmCDGQMzD/EZChVVlKt47NDYy08/
V/8w0QKBgCZCKKEGwpKXxRbD7DXK/s6/JOR7DyAwu0WYlHgBoXtcdlGmNrwqD5mw
wDojA4uIAIdjHck5hQ8fz8KcDnr27/74h61F826vfsUsNGMZEXgp6QL7hqlLaJWK
hwAVT8HsABDyoY7h5Q+hk972sfDz/F0xaXW/spLGVO5gWLG2ObU3
-----END RSA PRIVATE KEY-----
)KEY";
//end config.h stuff
void connectAWS()
{
  //Begin WiFi in station mode
  WiFi.mode(WIFI_STA); 
  //WiFi.begin(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  //Wait for WiFi connection
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  // Configure wifi_client with the correct certificates and keys
  wifi_client.setCACert(AWS_CERT_CA);
  wifi_client.setCertificate(AWS_CERT_CRT);
  wifi_client.setPrivateKey(AWS_CERT_PRIVATE);

  //Connect to AWS IOT Broker. 8883 is the port used for MQTT
  mqtt_client.begin(AWS_IOT_ENDPOINT, 8883, wifi_client);

  //Set action to be taken on incoming messages
  mqtt_client.onMessage(incomingMessageHandler);

  Serial.print("Connecting to AWS IOT");

  //Wait for connection to AWS IoT
  while (!mqtt_client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }
  Serial.println();

  if(!mqtt_client.connected()){
    Serial.println("AWS IoT Timeout!");
    return;
  }

  //Subscribe to a topic
  mqtt_client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

void getWeight()
{
  if(Serial2.available() > 0) {
    float floatWeight = Serial2.parseFloat();
    Serial.println(floatWeight);
  }
}

void publishMessage()
{
  //Create a JSON document of size 200 bytes, and populate it
  //See https://arduinojson.org/
  StaticJsonDocument<200> doc;
  doc["elapsed_time"] = millis() - t1;
  
  float floatWeight = Serial2.parseFloat();
  
  doc["value"] = floatWeight;
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); // print to mqtt_client

  //Publish to the topic
  mqtt_client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
  Serial.println("Sent a message");
}

void incomingMessageHandler(String &topic, String &payload) {
  Serial.println("Message received!");
  Serial.println("Topic: " + topic);
  Serial.println("Payload: " + payload);
}

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
  t1 = millis();
  connectAWS();
}

void loop() {
  if(Serial2.available() > 0) {
    publishMessage();
  }
  mqtt_client.loop();
  
  delay(4000);
}
