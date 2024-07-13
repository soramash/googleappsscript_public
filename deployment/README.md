# Deployment Manager Script

This script uses Google Apps Script to archive deployments for a specific project.

## Google Sheets OAuth 2.0 Integration

Here, you need to set up OAuth 2.0 authentication in Google Sheets to retrieve deployment information from Google Apps Script.

## Prerequisites

1. **Create OAuth 2.0 Client ID and Secret in Google Cloud Console**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
   - Navigate to "APIs & Services" > "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID".
   - Set the application type to "Web application" and add `https://script.google.com/macros/d/YOUR_GOOGLE_APPS_SCRIPT_ID/usercallback` as a redirect URI.
   - Obtain the Client ID and Client Secret.

2. **Set Constants in the Script**
   - Replace the following constants in the `OAuthOnGoogleSheet.gs` file with the obtained Client ID, Client Secret, and Project ID.

## Background

To create a Web App with Google Apps Script, you need to deploy it. Each time you make a change and deploy, the version number increments, and old versions remain accessible. While you can archive these versions via the GUI to disable access, it is cumbersome to archive each deployment individually.

Therefore, this script is designed to delete all versions except the latest deployment.

## Issues

When retrieving the list of deployments, archived deployments are also included. There is no parameter to determine if a deployment is archived. As a result, attempting to delete an archived deployment will cause an error and an exception will be thrown.

The script is designed to handle these exceptions.

## Summary

### How to use

- Set up the onOpen() function to be called during the OnOpen event of the Google Sheet.
- A new menu will be added to the Google Sheet, from which you can perform OAuth authentication.
- Once authenticated, call the archiveAllDeployment() function in Google Apps Script to delete unnecessary deployments.

### Functions

#### onOpen()

This function adds a menu when the Google Sheet is opened, from which other scripts can be executed.

## Script Functions

### getOAuthService
Sets up the OAuth 2.0 service, specifying the URL, Client ID, Secret, callback function, and scope for authentication and token retrieval.

### authCallback
Handles the authentication callback, confirming whether authentication was successful. Displays "Success!" if successful, and "Denied." if not.

### resetAuthorization
Resets the authentication information and prompts for re-authentication.

### showAuthorization
Displays a dialog with the authentication URL if authentication is required. If already authenticated, it notifies the user.

### fetchDeployments
If authentication is successful, retrieves deployment information for the specified project and logs it. If not authenticated, logs "Not authorized".

### onOpen
Creates a custom menu "OAuth2" with "Authorize" and "Reset Authorization" menu items when the spreadsheet is opened.

## Usage

1. **Add the Script to Google Sheets**
   - Open Google Sheets, go to "Extensions" > "Apps Script".
   - Create a new script file and paste the contents of `OAuthOnGoogleSheet.gs`.

2. **Run the Script**
   - Reload the spreadsheet to add the "OAuth2" menu.
   - Click "Authorize" to perform authentication.
   - Once authenticated, you can reset the authorization with "Reset Authorization" or retrieve deployment information with "fetchDeployments".

### `archiveAllDeployment`

This function archives all deployments except the latest one.

- Uses the `getOAuthService` function to obtain the OAuth service.
- If the service has access, sends a request to delete the specified deployment ID.
- Logs a message if the archive is successful.
- Logs an error message if an error occurs.

- Set the latest deployment ID in `latestDeploymentId`.
- Use the `fetchDeployments` function to retrieve all deployments.
- Parse the retrieved deployment list and filter out the latest deployment.
- Archive the filtered deployments using the `archiveDeployment` function.
- Display a message in the console once archiving is complete.

## Notes

- This script provides basic functionality for managing deployment information in Google Apps Script. Thoroughly test it before using it in a production environment.
- Be careful not to leak sensitive information such as Client ID and Client Secret to third parties.

- Replace `PROJECT_ID` with the ID of the target Google Cloud project.
- The `getOAuthService` function must be implemented to perform proper OAuth authentication.
- The `fetchDeployments` function must be implemented to retrieve all deployments.