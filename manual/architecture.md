# Architecture Diagrams
### Development Environment
The architecture used is based off of AWS Amplify. React Native is the JavaScript library used to develop for both Android and iOS devices, AWS S3 provides a storage solution, AWS Cognito provides authentication for the app, and AWS AppSync creates a GraphQL endpoint to interact with AWS DynamoDB as the backend database.

### Hardware Diagrams
The circuit connects the Scale (shown by the small circuit to the left) with the Arduino Mega 2560, which sends data to the ESP32 DEVKIT V1 to send to the database through Wi-Fi. The Scale connects to the Arduino’s 3.3 V, the D2 pin, the D4 pin, and GND. The ESP32’connects to the Arduino through the ESP32’s RX2 and TX2 pins, which connect to the board’s RX0 and TX0 pins, respectively. The ESP32 also connects to the Arduino’s GND. 