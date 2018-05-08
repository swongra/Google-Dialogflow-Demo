/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	"use strict";

	var ENTER_KEY_CODE = 13;
	var queryInput, resultDiv;

	window.onload = init;

	function init() {
		queryInput = document.getElementById("q");
		resultDiv = document.getElementById("result");

		queryInput.addEventListener("keydown", queryInputKeyDown);
	}

	function queryInputKeyDown(event) {
		if (event.which !== ENTER_KEY_CODE) {
			return;
		}

		var value = queryInput.value;
		queryInput.value = "";

		createQueryNode(value);
		var responseNode = createResponseNode();
		
		//detect(value,function(target_language){
	
			translate(value, 'en', function(source_translation,target_language){
					sendText(source_translation)
						.then(function(response){
							var result;
							try {
								result = response.result.fulfillment.speech
							} catch (error) {
								result = "";
							}
							console.log(source_translation);
							translate(result, target_language, function(target_translation,temp){
								setResponseOnNode(target_translation, responseNode);
								speak(target_translation, target_language, function(audioContent){
									createAudioNode(audioContent, responseNode);
								});
							});
							
							setResponseJSON(response);
							
						})
						.catch(function(err) {
							setResponseJSON(err);
							setResponseOnNode("Something goes wrong", responseNode);
						});
					});
			//	});
	}
	
	function detect(text, callback) {
		var translationApiDetectUrl = 'https://translation.googleapis.com/language/translate/v2/detect?key=AIzaSyDObCd-fYl7_XiVRDbDGgk6rtdEcq8IxRY';
		var payload = {
			q:  text
		}

		$.ajax({
			url: translationApiDetectUrl,
			type: 'post',
			headers: {
				'content-type': 'application/json'
			},
			success: function(data) {
				callback(data.data.detections[0].language);
			},
			data: JSON.stringify(payload)
		});
	}
	
	function translate(text, targetLang, callback) {
		var translationApiTranslateUrl = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyDObCd-fYl7_XiVRDbDGgk6rtdEcq8IxRY';
		var payload = {
			q: text, 
			target: targetLang
		}

		$.ajax({
			url: translationApiTranslateUrl,
			type: 'post',
			headers: {
				'content-type': 'application/json'
			},
			success: function(data) {
				
				callback(data.data.translations[0].translatedText,data.data.translations[0].detectedSourceLanguage);
			},
			data: JSON.stringify(payload)
		});
	}
	
	function speak(result,target_Lang,callback){
		var payload = {
			input: {
				text: result
			},
			voice: {
				languageCode: target_Lang
			},
			audioConfig: {
				audioEncoding: 'MP3'
			}
		}

		$.ajax({
			url: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDObCd-fYl7_XiVRDbDGgk6rtdEcq8IxRY',
			type: 'post',
			headers: {
				'content-type': 'application/json'
			},
			success: function(data) {
				callback(data.audioContent);
			},
			data: JSON.stringify(payload)
		});
	}
	
	function createAudioNode(byteArray, node) {
		var div = document.getElementById('audioDiv');
		div.innerHtml = '';
		var audio = document.createElement('audio');
		audio.setAttribute('controls', true);
		audio.setAttribute('autoplay', true);
		var source = document.createElement('source');
		source.setAttribute('src',`data:audio/mp3;base64,${byteArray}`);
		//var audio = document.getElementById('audioResult');
		audio.appendChild(source);
		node.appendChild(audio);
		
	}

	function createQueryNode(query) {
		var node = document.createElement('div');
		node.className = "clearfix left-align left card-panel green accent-1";
		node.innerHTML = query;
		resultDiv.appendChild(node);
	}

	function createResponseNode() {
		var node = document.createElement('div');
		node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
		node.innerHTML = "...";
		resultDiv.appendChild(node);
		return node;
	}

	function setResponseOnNode(response, node) {
		node.innerHTML = response ? response : "[empty response]";
		node.setAttribute('data-actual-response', response);
	}

	function setResponseJSON(response) {
		var node = document.getElementById("jsonResponse");
		node.innerHTML = JSON.stringify(response, null, 2);
	}

	function sendRequest() {

	}
})();