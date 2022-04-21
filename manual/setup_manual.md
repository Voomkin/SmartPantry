# Setup Manual
### User's Guide
To use our application, you need to navigate to your App Store and download “Smart Pantry – Group 3”. You can find our application on both the Google Play Store and Apple’s App Store. After you have downloaded the application, please unbox your Smart Pantry Weight Sensor and place it in a location you wish while also being in a good range for your Wi-Fi router. Please connect it to Wi-Fi for it to work.   
 
After setting up your Smart Pantry Weight Sensor and connecting it to Wi-Fi, please open the downloaded Smart Pantry Application. You should be greeted with this screen... 

<img src="./images/signin.jpg" height="500px" width="250px"></img>

You must first create an account, please create an account with a secure password that is at least 16 characters long! After you are done with your account creation, you will be sent an email to the email address that is attached to your account... you must use that verification code to complete the creation process. Once you have done that you can then login with your new account! After you login in you should be greeted with this screen... 

<img src="./images/welcome.png" height="500px" width="500px"></img>

You should now be all set up! Just tap the 3-line menu (hamburger menu) in the top left and navigate to ‘My Pantry’ in the menu that comes out.  

### Programmer's Guide
To begin, you must navigate to https://github.com/Voomkin/SmartPantry/releases and download the most recent release. You can alternatively git clone https://github.com/Voomkin/SmartPantry in order to obtain the most updated codebase but be warned there might be unsquashed bugs.  
 
After performing either of the above, navigate to the directory where the project is located and run the following commands to gather the necessary dependencies. 

*npm install* 

*amplify init* 

You must provide your AWS credentials during the Amplify Initialization process. If you do not already have Android Studio (or XCode if you are on MacOS), you should install your respective emulation software and follow these instructions to set up your emulator.  

*Android*: https://developer.android.com/studio/run/emulator 

*iOS*: https://docs.experitest.com/display/TC/AS+-+Connecting+An+iOS+Emulator  
 
 
If you wish to develop within the weight module, you must unbox your Smart Pantry Weight Sensor and download the Arduino IDE (https://www.arduino.cc/en/software) to begin development 