/**
 *
 */

function onFormSubmit(e) {
    var response = e.response;
    // var itemResponses = e.response.getItemResponses();
    // console.log(JSON.stringify(itemResponses))
    var email = response.getRespondentEmail();
    var nickname = getNicknamefromEmail(email);
    var message = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "<@xxxxxxx> : New Request has been submitted by ".concat(nickname, ".")
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "open the Google Form."
                },
                "value": "See the Submit Sheet ---> ",
                "action_id": "button",
                "url": "https://docs.google.com/forms/d/ixxxxxxxxx"
            }
        }
    ];
    var urlkey = "SLACK_POST_URL_CHANNEL";
    postMessageToSlack(message, "New request submitted.", urlkey);
}
