var app = (function() {
  'use strict';

  function logResult(result) {
    console.log(result);
  }

  function logError(error) {
    console.log('Looks like there was a problem: \n', error);
  }

  if (!('fetch' in window)) {
    console.log('Fetch API not found, try including a polyfill');
    return;
  }

  function fetchJSON() {
    fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
  }

  function validateResponse(response) {
    if(!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  function readResponseAsJSON(response) {
    return response.json();
  }

  function showImage(responseAsBlob) {
    var container = document.getElementById('container');
    var imgElem = document.createElement('img');
    container.appendChild(imgElem);
    var imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
  }

  function readResponseAsBlob(response) {
    //console.log(response.blob());
    return response.blob();
  }

  function fetchImage() {
    fetch('examples/kitten.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
  }

  function showText(responseAsText) {
    var message = document.getElementById('message');
    message.textContent = responseAsText;
  }

  function readResponseAsText(response) {
    return response.text();
  }

  function fetchText() {
    fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
  }

  function headRequest() {
    fetch('examples/words.txt', {
        method: 'HEAD'
    })
    .then(validateResponse)
    .then(logSize)
    .then(readResponseAsText)
    .then(logResult)
    .catch(logError);
  }

  function logSize(response) {
    var myHeaders = response.headers;
    console.log(myHeaders.get('Content-length'));
    return response;
  }

  /* NOTE: Never send unencrypted user credentials in production! */
  function postRequest() {
    // Used to post request and echo back from server
    // fetch('http://localhost:5000/', {
    //     method: 'POST',
    //     body: 'name=yevhen&message=hello world'
    // })
    // .then(validateResponse)
    // .then(readResponseAsText)
    // .then(logResult)
    // .catch(logError);

    var formData = new FormData(document.getElementById('myForm'));
    //echo server needed
    fetch('http://localhost:5000/', {
      method: 'POST',
      body: formData,
      headers: customHeaders
    })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(logResult)
    .catch(logError);
  }
var customHeaders = new Headers({
    'Content-Type': 'text/plain',
    // 'Content-Length': 'kittens' // Content-Length can't be modified!
    'X-Custom': 'hello world',
    // 'Y-Custom': 'this won\'t work' // Y-Custom is not accepted by our echo server!
  });

})();
