# Smart Pantry User Manual and System Manual
Thank you using our Smart Pantry application. In this guide, you will find the User Manual and the System Manual for our application. The User Manual explains how to use the app, and is intended to act as a reference for users who would like to familiarize themselves with a feature of the application. The System Manual shows all the functions used throughout the application, and is intended to act as a reference for programmers who would like to understand how the app works under the hood.

The Smart Pantry app was created by the following students in the LANE department of Electrical Engineering and Computer Science at West Virginia University:
- Shannon Biega
- Kollin Labowski
- Jonathan Malcomb
- Ryan Mraz
- Matthew Winston

To view the System Manual, select the "Source" tab at the top left of the screen.

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

### Documentation of Testing

### Architecture Diagram

The architecture used is based off of AWS Amplify. React Native is the JavaScript library used to develop for both Android and iOS devices, AWS S3 provides a storage solution, AWS Cognito provides authentication for the app, and AWS AppSync creates a GraphQL endpoint to interact with AWS DynamoDB as the backend database. 

![Architecture Diagram](/assets/images/arch_diagram.png)

### User Interface
### Setup Manual
### User Manual and Maintenance Manual
### Reflections and Intructions for Future Developers
### Directory of the Project Archive

Group 3’s Smart Pantry Application is housed on GitHub at the following link:
- https://github.com/Voomkin/SmartPantry/tree/master 