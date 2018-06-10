# metisoft-client-firebase-util

This module is intended to be used in a Cordova environment with the plugin `cordova-plugin-firebase` installed.

## Installation

1. In your Cordova app, install `cordova-plugin-firebase` and `metisoft-client-firebase-util`.
2. Go to the [Firebase Console](https://console.firebase.google.com) and register a new app if you haven't already.
3. In the Firebase Console, go to "Add Firebase to your Android app" or "Add Firebase to your iOS app". In the first step, put in the Android package name or iOS bundle ID. After this step, you will download a config file. For Android, this is `google-services.json`, and for iOS, this is `GoogleService-Info.plist`. Put these files into the root directory of your project. Skip through the rest of the config on the Console site (and don't worry about the final step of verifying the installation).
4. Somewhere in the initialization portion of your app, make a function that implements the `FnSendTokenToServer` interface from `metisoft-client-firebase-util`. This function is explained below.
5. Call `init()`, providing the function you made. From this point forward, the Firebase token should be sent to your server whenever `cordova-plugin-firebase` generates it.

## FnSendTokenToServer

The point of this module is to associate a Firebase token with a user of your app. Since user authentication systems will vary based on the app, it is up to you to define the association on both the server and client. Since this module is concerned only with the client, we will only discuss the client side here.

The definition of the association is done in a function that implements the `FnSendTokenToServer` interface. It receives a Firebase token and returns a Promise of any value. The function you define will be called whenever Firebase generates a token on the client, which usually happens when the app initializes. Since you will want to associate the token with a user, you will likely want to define the function to operate as such:
1. Store the token in memory.
2. Check to see if the user is logged in. If they are, immediately make a call to the server to send the token.
3. If the user is not logged in, rely on another function that will be called when the user logs in to send the stored token to the server.