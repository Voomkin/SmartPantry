# Documentation of Testing

### Create Account / Login



 1. On the “Sign in to your account” screen, click “Sign Up”
- This will open a screen with “Create a new account” at the top, with four text fields.

<img src="../manual/images/testing/CA_L_1.png" height="700px" width="350px"></img>

 2. Fill in the:
- “Username” field with a valid email address
- “Password” field with a password
- “Email” field with a valid email address
- “Phone Number” with a valid phone number

<img src="../manual/images/testing/CA_L_2.png" height="700px" width="350px"></img>

 3.  Click “Sign Up”
- This will open a screen with “Confirm Sign Up” at the top, with two text fields. This will also send a confirmation code to the email address previously provided.

<img src="../manual/images/testing/CA_L_3.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/CA_L_3a.png" height="300px" width="500px"></img>

 4. Fill in the:
- “Username” field with the email address previously provided
- “Confirmation Code” field with the confirmation code received via email

<img src="../manual/images/testing/CA_L_4.png" height="700px" width="350px"></img>

 5.  Click “Confirm”
 - This will open a screen with “Sign in to your account” at the top, with two text fields.

 <img src="../manual/images/testing/CA_L_5.png" height="700px" width="350px"></img>

 6.  Fill in the:
- “Username” field with the email address previously provided
- “Password” field with the matching password to the email in the “Username” field
 7.  Click “Sign In”
- This will open a screen with “Welcome” at the top

 8.  Click the three horizontal lines in the top left corner of the screen
- A sidebar will open on the left of the screen with the following options:  Welcome, My Pantry, Shopping List, My Profile, Help, Settings
-The username used to log in will show above the sidebar options

<img src="../manual/images/testing/CA_L_8.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/CA_L_8a.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/CA_L_9.png" height="700px" width="350px"></img>

### Create Pantry

 1. On the “Welcome” screen, click the three horizontal lines on the top left of the screen
- A sidebar will open on the left of the screen with the following options:  Welcome, My Pantry, Shopping List, My Profile, Help, Settings
    

 2.  Click the “My Pantry” option
 - This will open a screen with “My Pantry” at the top, with one button in the middle of the screen with “Create Pantry” on it.

 <img src="../manual/images/testing/CP_3.png" height="700px" width="350px"></img>

 3.  Click the “Create Pantry button”
    - This will open a screen with “Create Pantry” at the top, underneath the parent screen “My Pantry”, with one text field in the middle of the screen and a button underneath with “Submit” on it.

<img src="../manual/images/testing/CP_4.png" height="700px" width="350px"></img>

 4.  Click the text field and enter a name for the pantry
    

 5. Click the “Submit” button
    - This will return to the “My Pantry” screen, but will have the provided name of the pantry in the middle of the screen, with a button underneath with “Add Item” on it

<img src="../manual/images/testing/CP_6.png" height="700px" width="700px"></img>

### Manual Add Item / View Pantry
 1.  On the “My Pantry” screen, after a pantry is created, click the “Add Item” button
    - This will open a child screen called “Add Item” with four text boxes and two buttons with “Barcode Add” and “Submit", respectively

<img src="../manual/images/testing/MA_1.png" height="700px" width="350px"></img>

 2.  Fill in the:
    - “Name” field with “Tomato Soup”
    - “Weight” field with 1
    - “Quantity” field with 5
    - “Expiration date” with the date 30 days away

<img src="../manual/images/testing/MA_2.png" height="700px" width="350px"></img>

 3.  Click the “Submit” button
  - This will return to the main “My Pantry” screen with the added item shown below the “Add Item” button. The new item will include the item name, the given weight, the given quantity, the given expiration date, an “Update” button, and a “Delete” button

<img src="../manual/images/testing/MA_4.png" height="700px" width="350px"></img>

### Barcode Add Item
 1.  On the “My Pantry” screen, after a pantry is created, click the “Add Item” button
    -This will open a child screen called “Add Item” with four text boxes and two buttons with “Barcode Add” and “Submit", respectively

<img src="../manual/images/testing/BA_1.png" height="700px" width="700px"></img>

 2.  Click the “Barcode Add” button
    - The phone’s camera will open inside a child screen called “Barcode Add”

 3.  Point the camera at the barcode on the wanted item
 - This will open a screen with the name of the item above two text fields, a button called “Submit” and a button called “Go Back” underneath
 - Clicking “Go Back” will return to the “Add Item” screen. If clicked, follow steps 1-3 to return to the screen with the “Go Back” button
    
<img src="../manual/images/testing/BA_3.png" height="700px" width="350px"></img>

 4.  Fill in the:
    - “Quantity” as 1

 5.  Click the “Submit” button
    - This will return to the “Add Item” screen

<img src="../manual/images/testing/BA_5.png" height="700px" width="350px"></img>

 6.  Click the arrow in the top left of the screen
    - This will return to the “My Pantry” screen, and will refresh to include the added item

<img src="../manual/images/testing/BA_6.png" height="700px" width="350px"></img>

### Update Item
 1.  On the “My Pantry” screen, click the “Update” button next to an item with the values:
- Name: Tomato Soup
    - Weight: 1
- Quantity: 5
- This will open a screen with “Edit your item” at the top, with three text fields and two buttons called “Submit” and “Go Back”

<img src="../manual/images/testing/BA_6.png" height="700px" width="350px"></img>

 2.  Fill in the:
    - “Name” field with “Soup”
- “Quantity” field with 4
- Clicking “Go Back” will return to the “My Pantry” screen. If clicked, follow steps 1-2 to return to the “Edit your item” screen

<img src="../manual/images/testing/UI_2.png" height="700px" width="350px"></img>

 3.  Click the “Submit” button
    - This will return to the “My Pantry” screen with the changed values shown for the updated item

<img src="../manual/images/testing/UI_3.png" height="700px" width="350px"></img>

### Remove Item
 1.  On the “My Pantry” screen, click the “Remove” button next to an item with the values:
    - Name: Tomato Soup
- Weight: 1
- Quantity: 4
- This will open a pop-up called “Delete Item” asking for confirmation to delete
- Clicking “No” will return to the “My Pantry” screen. If clicked, follow step 1 to return to the pop-up

<img src="../manual/images/testing/DI_2.png" height="700px" width="350px"></img>

2.  Click “Yes” 
- This will open another pop-up called “Shopping List” asking if the item should be added to the shopping list
- Clicking “No” will return to the “My Pantry” screen and delete the item, but not add it to the shopping list. If clicked, follow steps 1-2 to return to the “Shopping List” pop-up

3.  Click “Yes”
- This will return to the “My Pantry” screen with the removed item not shown

<img src="../manual/images/testing/DI_3.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/DI_5.png" height="700px" width="350px"></img>

4.  Click the three horizontal lines in the top left of the screen
- This will open a sidebar with the following options: Welcome, My Pantry, Shopping List, My Profile, Help, Settings, Create Pantry

5.  Click “Shopping List”
- This will open the “Shopping List” screen with a button that says “Add Item” in the middle, and the item added to the shopping list with a button with “Delete Item” on it

<img src="../manual/images/testing/DI_6.png" height="700px" width="350px"></img>

### Notifications 
1.  Make sure the pantry is empty
    
<img src="../manual/images/testing/N_1.png" height="700px" width="350px"></img>

2.  On the “My Pantry” screen, click the three horizontal lines in the top left of the screen    
- This will open a sidebar with the following options: Welcome, My Pantry, Shopping List, My Profile, Help, Settings, Create Pantry
3.  Click the “Settings” option
    - This will open the “Settings” screen, with the options: My Information, Manage My Pantry, Collaborator Pantry, Notifications, Help, About, Meet The App Developers, Sign Out

<img src="../manual/images/testing/N_2.png" height="700px" width="350px"></img>

4.  Click the “Notifications” option
    - This will open the “Notifications” screen, with multiple bars with different time increments on them spanning the width of the screen

<img src="../manual/images/testing/N_3.png" height="700px" width="350px"></img>

5.  Click the “10 SECONDS” bar
    - This will check to see if notifications need to be sent every 10 seconds

<img src="../manual/images/testing/N_4.png" height="700px" width="350px"></img>

6.  Click the three horizontal lines in the top left of the screen
    - This will open a sidebar with the following options: Welcome, My Pantry, Shopping List, My Profile, Help, Settings, Create Pantry

7.  Click the “My Pantry” option
- This will open the “My Pantry” screen, showing all the items that are in the pantry

<img src="../manual/images/testing/N_5.png" height="700px" width="350px"></img>

8.  Click the “Add Item” button
    - This will open a child screen called “Add Item” with four text boxes and two buttons with “Barcode Add” and “Submit”, respectively

9.  Fill in the:
    - “Name” field with “Tomato Soup”
    - “Weight” field with 1
    - “Quantity” field with 5
    - “Expiration date” with the date 30 days away

<img src="../manual/images/testing/N_6.png" height="700px" width="350px"></img>

10.  Click the “Submit” button
    - This will return to the main “My Pantry” screen with the added item shown below the “Add Item” button. The new item will include the item name, the given weight, the given quantity, the given expiration date, an “Update” button, and a “Delete” button

11.  Click the “Add Item” button
    - This will open a child screen called “Add Item” with four text boxes and two buttons with “Barcode Add” and “Submit”, respectively

12.  Fill in the:
    - “Name” field with “Milk”
    - “Weight” field with 1
    - “Quantity”  field  with 1
    - “Expiration date” with the date 2 days away

<img src="../manual/images/testing/N_7.png" height="700px" width="350px"></img>

13.  Click the “Submit” button
    - This will return to the main “My Pantry” screen with the added item shown below the “Add Item” button. The new item will include the item name, the given weight, the given quantity, the given expiration date, an “Update” button, and a “Delete” button

<img src="../manual/images/testing/N_8.png" height="700px" width="350px"></img>

14.  Click the “Update” button next to the item called “Tomato Soup”
    

15.  Fill in the:
    - “Quantity” field with 1

<img src="../manual/images/testing/N_9.png" height="700px" width="350px"></img>

16.  Click the “Submit” button
    - This will return to the “My Pantry” screen with the changed values shown for the updated item

<img src="../manual/images/testing/N_10.png" height="700px" width="350px"></img>

17.  Wait for 10 seconds
    - A notification will be sent within 10 seconds saying “You have 1 item(s) expiring soon and 1 item(s) running low! Click here to view them.”

<img src="../manual/images/testing/N_11.png" height="700px" width="350px"></img>

18. You will be prompted to add the item to your shopping list. Click "No".

<img src="../manual/images/testing/N_12.png" height="700px" width="350px"></img>

### Create Account Edge Cases
1. On the “Sign in to your account” screen, click “Sign Up”
    - This will open a screen with “Create a new account” at the top, with four text fields.
2. Fill in the:
    - “Username” field with an invalid email address
    - “Email” field with an invalid email address

<img src="../manual/images/testing/CAE_1.png" height="700px" width="350px"></img>

3. Click “Sign Up”
    - This will open an error saying the required fields need to be filled

<img src="../manual/images/testing/CAE_2.png" height="700px" width="350px"></img>

4. Fill in the:
    - “Username” field with a valid email address
    - “Password” field with a password
    - “Email” field with a valid email address
    - “Phone Number” with a valid phone number

<img src="../manual/images/testing/CA_L_2.png" height="700px" width="350px"></img>

5. Click “Sign Up”
    - This will open a screen with “Confirm Sign Up” at the top, with two text fields. This will also send a confirmation code to the email address previously provided.

<img src="../manual/images/testing/CA_L_3.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/CA_L_3a.png" height="300px" width="500px"></img>

6. Fill in the:
    - “Username” field with the email address previously provided
    - “Confirmation Code” field with an invalid confirmation code
    - This will open an error saying the confirmation code was incorrect

<img src="../manual/images/testing/CAE_3.png" height="700px" width="350px"></img>

### Login Edge Cases
1. On the “Sign in to your account” screen with an account already created, fill in the fields:
    - “Username” with an existing username
    - “Password” with a mismatching password
    - An error message will pop up saying the username or password was incorrect

<img src="../manual/images/testing/LE_1.png" height="700px" width="350px"></img>

2. Fill in the fields:
    - “Username” with a nonexistent username
    - “Password” with a valid password
    - An error message will pop up saying the username or password was incorrect

<img src="../manual/images/testing/LE_2.png" height="700px" width="350px"></img>

### Update/Barcode/Manual Item Add Edge Cases
1. Input invalid Quantity or Weight
    - Input a negative quantity or weight: An error message displays, “(Quality/Weight) cannot be negative”. Your item will be removed from your pantry.

<img src="../manual/images/testing/UIE_1.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/UIE_2.png" height="700px" width="350px"></img>

    - Input a decimal quantity. The quantity will be rounded down to the nearest whole number.

<img src="../manual/images/testing/UIE_3.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/UIE_4.png" height="700px" width="350px"></img>

### Notifications Edge Cases
1. Notification linked to deleted Item does not break application
    - Have an Item that is either close to expiring (~6 days from expiration  date) or low (~25% of max weight or quantity), when a Notification is triggered. Delete the item first, then click the Notification: Application navigates to the ‘My Pantry’ page. Application does not break.

<img src="../manual/images/testing/NE_1.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/NE_2.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/NE_3.png" height="700px" width="350px"></img>

<img src="../manual/images/testing/NE_4.jpg" height="700px" width="350px"></img>

<img src="../manual/images/testing/NE_5.png" height="700px" width="350px"></img>