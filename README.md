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

## Edit Files

1. Edit 'Demofunctons.js' and replace Client Access token. Replace with client access token from your Dialogflow agent.

        var client = new ApiAi.ApiAiClient({
          accessToken: '<DIALOGFLOW_CLIENT_ACCESS_TOKEN>'
        });

        function sendText(text) {
          return client.textRequest(text);
        }

## Deploy Application to Firebase

1. cd to your project's directory housing JS and HTML files. Run the following command:

    firebase deploy

2. Preview via URL provided. 









