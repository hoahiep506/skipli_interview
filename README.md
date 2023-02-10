# Skipli Test Interview

This project only run in dev environment. I do not config anything for build or deploy on internet.

## Backend

In root project you can

    cd .\back_end\
    npm install

After that make sure you have `.env` file in `.\back_end\`
Create Twilio account at https://www.twilio.com/
Create Firebase account at https://firebase.google.com/

    //.env config
    PORT=4000

    TWILIO_SID=AC611b6930cefe97748ee92ae8e3f35cda
    TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    TWILIO_PHONE_NUMBER=+12182559631

    FIREBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    FIREBASE_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    FIREBASE_PROJECT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    FIREBASE_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    FIREBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx
    FIREBASE_MEASUREMENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxx

Finally start server on port 4000

    npm run dev

## Frontend

In root project you can start server by some commands

    cd .\front_end\
    npm install
    npm run start

Make sure you input a verified phone in twilio.com/user/account/phone-numbers/verified to get Access code

If not you can go to firestore data base of firebase to get Access code
