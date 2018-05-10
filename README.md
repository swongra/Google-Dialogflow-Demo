# Google Dialogflow, Translate, and Text-to-Speech API Demo
Dialogflow demo using Translate and Text-to-Speech API on a Firebase instance

## Objectives
This is a sample deployment of Dialogflow will:
* Create a custom html front end. 
* Detect user inputed text's language using Detect feature of the Google Translate API
* Translate text into English using the Google Translate API
* Send the user request through API.AI/Google Dialogflow 
* Return results back to the user by translating back into original language using the Google Translate API
* Playback the response using the Google Speech-to-Text API and encode audio to mp3
* Show JSON payload response on the webpage to the user

## Before you begin
1. Go to dialogflow.com to create your first agent. Save Client Access Token. 
2. Create Firebase instance.
3. Enable the Translate and Speech-to-Text API in your Cloud Console project.

[Dialogflow Documentation]: https://dialogflow.com/
[Firebase Documentation]: https://firebase.google.com/docs/hosting/deploying
[Google APIs]: https://support.google.com/cloud/answer/6158841?hl=en

## Initialize Firebase Directory
1. Create a directory locally or in GCP Cloud Shell to publish files to.
2. Direct Install the Firebase CLI. The Firebase CLI (Command Line Interface) requires Node.js and npm, which can both be installed by following the instructions on https://nodejs.org/. Installing Node.js also installs npm. The Firebase CLI requires Node.js version 5.10.0 or greater. Once you have Node.js and npm installed, you can install the Firebase CLI via npm:

        npm install -g firebase-tools

3. This installs the globally available firebase command. To update to the latest version, simply re-run the same command.

## Edit Files

1. Edit 'Demofunctons.js' and replace Client Access token. Replace with client access token from your Dialogflow agent.

        var client = new ApiAi.ApiAiClient({
          accessToken: '<DIALOGFLOW_CLIENT_ACCESS_TOKEN>'
        });

        function sendText(text) {
          return client.textRequest(text);
        }

## Deploy Application to Firebase

### Initializing your site
1. If you have an existing Firebase project you'd like to deploy, cd to the project's root directory and run:

        $ firebase init

### Deploying your site
1. To deploy your site, simply run the following command from your project directory:

        $ firebase deploy

2. Preview via URL provided. 









