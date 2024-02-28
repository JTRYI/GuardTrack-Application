<img src ="https://github.com/JTRYI/GuardTrack/blob/main/client/public/GuardTrack%20IoT%20Solution%20Logo.png" width="150"/>

# GuardTrack
TP Year 2 Sem 2 Project for IoT Application Development Module

## Problem Statement
GuardTrack addresses the pressing issue of unauthorized access, potential theft, and safety concerns within parked cars. 
Car owners often face challenges related to the security and well-being of their vehicles, especially in scenarios where they are unable to physically inspect the car's interior.

## How was it Built/Simulated?
Built and Simulated with AWS Services and React
This Repository/Application works with "GuardTrack-IoT-Devices" Repository for the Simulation to Work. 

## AWS Services Used
  - IoT Core
  - Lambda
  - DynamoDB
  - Simple Notification Service
  - S3 Bucket
  - CloudFront
  - API Gateway
  - Cloudwatch
    
## Features
  -  **Sound and Motion Sensors:** <br/>
Utilizes sound and motion sensors within the car. <br/>
Continuously monitors the car's environment for any unexpected activities. <br/>
Detects audible disturbances and movement within the vehicle.

  - **Real-Time Alerts:** <br/>
Immediately sends alerts to the car owner via SMS and Email when Sound exceeds a certain threshold like 70 Decibels or Movement is detected. <br/>
Enables owners to stay informed about events happening in their vehicle even when they're not present.

  - **Live Camera Feed:** <br/>
Incorporates a live camera installed in the car <br/>
Allows car owners to access the live camera feed through the mobile app. <br/>
Provides visual confirmation of events detected by the sound and motion sensors. <br/>
Enables owners to distinguish between harmless events and critical situations.

- **Pest Detection and Control:** <br/>
Detects pests in the car's interior. <br/>
Enables car owners to make informed decisions about addressing pest-related issues. <br/>
Offers a pest control device that sprays pesticides to address pest infestations. <br/>
Allows users to trigger the release of pesticides through the mobile app.

## Commands to Run React Application
  - Change Directory to Client - `cd client`
  - Run React Application - `npm start`
  
## Future Enhancements
  - Offline Mode
