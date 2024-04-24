/**
 *
 */

function onFormSubmit(e) {
    let softwareName = ""
    const response = e.response;
    const itemResponses = response.getItemResponses(); 
    // Iterates over the item responses.
    for (const itemResponse of itemResponses) {
      const title = itemResponse.getItem().getTitle()
      if(title === "Software Name"){
        softwareName = itemResponse.getResponse()
      }
      // Logs the items' questions and responses to the console.
      console.log(`Response to the question '${title}' was
        '${itemResponse.getResponse()}'`);
    }

    const email = response.getRespondentEmail();
    const nickname = getNicknamefromEmail(email);
    const message = [
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
