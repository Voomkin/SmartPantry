# Smart Pantry User Manual and System Manual
Thank you using our Smart Pantry application. In this guide, you will find the User Manual and the System Manual for our application. The User Manual explains how to use the app, and is intended to act as a reference for users who would like to familiarize themselves with a feature of the application. The System Manual shows all the functions used throughout the application, and is intended to act as a reference for programmers who would like to understand how the app works under the hood.

The Smart Pantry app was created by the following students in the LANE department of Electrical Engineering and Computer Science at West Virginia University:
- Shannon Biega
- Kollin Labowski
- Jonathan Malcomb
- Ryan Mraz
- Matthew Winston

To view the System Manual, select the "Source" tab at the top left of the screen.

### Abstract
Elderly populations face numerous challenges concerning their health and well-being, causing them to experience memory loss which creates simple tasks, like tracking food items, much more difficult. Elders who struggle to track their food items are probable to over purchasing food and increasing food waste. Our group proposes a Smart Pantry application which will track a user’s food items (name, quantity, weight) in a virtual pantry and notify the user when food item quantities are low, or dates are near expiring. The project vision statement is seen in the following section and the project goals are the following: (1) track food item quantities and weights for users; (2) aid elders in remembering their food items and living more independently; (3) reduce food waste and malnutrition among elders. 


### Vision Statement
A CSEE 481 effort to assist elders in tracking their food pantry items and living more independently while decreasing food waste and malnutrition among elders.  

### Current Status of the Project
| Requirement Number | Requirement Description | Completion Status | Is it demonstratable? | Comment                                                                                                    |
|--------------------|-------------------------|-------------------|-----------------------|------------------------------------------------------------------------------------------------------------|
| 1                  | Create Account          | Yes               | Yes                   | A user can successfully create an account with their chosen credentials and can access account information |
| 2                  | Login                   | Yes               | Yes                   | A user can login to the Smart Pantry application                                                           |
| 3                  | Create Pantry           | Yes               | Yes                   | A user can to create a pantry                                                                              |
| 4                  | View Pantry             | Yes               | Yes                   | A user can view the contents of the pantry                                                                 |
| 5                  | Barcode Add Item        | Yes               | Yes                   | A user can add a food item to their pantry via scanning the barcode of the item                            |
| 6                  | Manual Add Item         | Yes               | Yes                   | A user can add a food item to their pantry by manually inputting the information                           |
| 7                  | Update Item             | Yes               | Yes                   | A user can modify the name/quantity/weight of a food item                                                  |
| 8                  | Remove Item             | Yes               | Yes                   | A user can remove an item from the pantry                                                                  |
| 9                  | Notifications           | Yes               | Yes                   | A user has a notification displayed when a food item's quantity/weight is low or if it is expiring soon    |


### Reflections and Intructions for Future Developers
This project uses Expo as its environment, and it supports the development of mobile applications with React Native. This environment was chosen over other alternatives because it allows developed mobile applications to run the same on both Android and IOS devices. It allowed development of the app to work seamlessly with a simply scan of a QR code.

One unexpected obstacle for connecting the scale to the Smart Pantry Application was the lack of a Bluetooth API in Expo. When adding or updating an item in the database, the user has the option to weigh/reweigh the item, which we expected to work by having the scale connect to an Arduino, then to an ESP32, and then to the app. However, because Expo (the platform we used to make our app to be cross-platform) doesn’t have a Bluetooth API, this was a lot more complicated than expected.  

Because of this, we decided to communicate with the database directly through Wi-Fi and autofill the “weight” field in the app from the added weight in the database. If Expo includes a Bluetooth API in the future, it would be a good idea to have the scale autofill the “weight” field from the ESP32 (or similar Bluetooth communicator), wait for user confirmation, and then add/update the weight. 

If migrated from Wi-Fi to Bluetooth, significant change to the development environment would have to be made, which may conflict with other features (Notifications, etc.). 

Additionally, it would be a good idea to add some sort of visual or auditory indication on the physical scale itself that would show the user that the weight value has been successfully read, just to make the scale easier to use and understand.

Another project for future developers to take on would be adding nutrition-tracking capabilities to the app. That is, tracking the specific types of foods users are adding to their pantry, and using the tracked foods to make determinations about the user's eating habits. For example, it might be a good idea to have a check for if a user is adding too much junk food (ice cream, soda, chips, etc) or too many alcoholic beverages, and to notify a collaborator about these eating habits as well. Likewise, it would also be good to make sure that users are adding a sufficient amount of nutritious foods like fruits and vegetables to their pantry. Furthermore, the statistics of types of foods users are adding to their pantry could be tracked, and the user could be shown a detailed portfolio with a breakdown of their eating habits over a period of time.

Voice recognition would be another great addition to this project in the future, either added manually, or (preferably) through the Amazon Alexa service. This would go a long way to make the app even easier to use.

### Directory of the Project Archive

Group 3’s Smart Pantry Application is housed on GitHub at the following link:
- https://github.com/Voomkin/SmartPantry/tree/master 