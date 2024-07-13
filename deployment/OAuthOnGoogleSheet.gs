/***
 * You need to create OAuth 2.0 client ID and secret on the Google Cloud Console.
 * 
 */
const CLIENT_ID = 'YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com';
const CLIENT_SECRET = 'YOUR_GOOGLE_OAUTH_CLIENT_SECRET';
const REDIRECT_URI = `https://script.google.com/macros/d/${PROJECT_ID}/usercallback`;
const PROJECT_ID = 'YOUR_GOOGLE_APPS_SCRIPT_ID' // specifiy the script id that has depoloyments you want to delete.

function getOAuthService() {
  return OAuth2.createService('deployManagement')
    .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
    .setTokenUrl('https://oauth2.googleapis.com/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('https://www.googleapis.com/auth/script.deployments')
    .setParam('access_type', 'offline')
    .setParam('approval_prompt', 'force');
}

function authCallback(request) {
  var oauthService = getOAuthService();
  var isAuthorized = oauthService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
}

function resetAuthorization() {
  var oauthService = getOAuthService();
  oauthService.reset();
  SpreadsheetApp.getUi().alert('Authorization reset. Please re-authorize.');
  showAuthorization();
}

function showAuthorization() {
  var oauthService = getOAuthService();
  if (!oauthService.hasAccess()) {
    var authorizationUrl = oauthService.getAuthorizationUrl();
    var htmlOutput = HtmlService.createHtmlOutput('<a href="' + authorizationUrl + '" target="_blank">Authorize</a>')
      .setWidth(400)
      .setHeight(300);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Authorization Required');
  } else {
    SpreadsheetApp.getUi().alert('You are already authorized.');
  }
}


function fetchDeployments() {
  var oauthService = getOAuthService();
  if (oauthService.hasAccess()) {
    var url = `https://script.googleapis.com/v1/projects/${PROJECT_ID}/deployments`;
    var response = UrlFetchApp.fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + oauthService.getAccessToken(),
        Accept: 'application/json'
      }
    });
    Logger.log(response.getContentText());
    return response.getContentText();
  } else {
    Logger.log('Not authorized');
    return 'Not authorized';
  }
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('OAuth2')
    .addItem('Authorize', 'showAuthorization')
    .addItem('Reset Authorization', 'resetAuthorization')
    .addToUi();
}
