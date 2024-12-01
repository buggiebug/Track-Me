# Welcome to Expense Tracker app 👋

## Get started

1. Install dependencies

   ```bash
   npm i / npm ci
   ```

2. Start the app

   ```bash
    npm run start
   ```


## BUNDLE THE APK

STEP 1.

Login with [eas](https://expo.dev/login) in your project 

STEP 2:

RUN: `eas build -p android`    

STEP 3:

Download [Bundle Tool](https://github.com/google/bundletool/releases) and your file.aab file which is generate by eas, move them into a folder called output and goto inside the output directory

STEP 4:

If you have not Keystore then Generate Signed APKs using:

    keytool -genkeypair -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias


STEP 5:

Run the Bundletool Command with Keystore 

    java -jar bundletool-all-1.17.2.jar build-apks --bundle=ex1.aab --output=ex1.apks --mode=universal --ks=my-release-key.jks --ks-key-alias=my-key-alias --ks-pass=pass:12345678


STEP 6:

    Extract the APK Once the .apks file is created, extract the APK using the manual method

    The .apks file is a ZIP archive. You can manually extract its contents to locate the universal APK:

    1. Rename expense_tracker.apks to expense_tracker.zip.
    2. Extract it using any ZIP tool.
    3. Find the universal APK in the universal directory.

