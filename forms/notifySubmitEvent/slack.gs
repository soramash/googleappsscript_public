"use strict";
function postMessageToSlack(message, txt, urlkey) {
    var postUrl = PropertiesService.getScriptProperties().getProperty(urlkey);
    if (postUrl == null)
        return false;
    var payload = {
        "text": txt,
        "blocks": message
    };
    var params = {
        "method": "post",
        "payload": JSON.stringify(payload),
        "headers": { "Content-type": "application/json" }
    };
    try {
        var response = UrlFetchApp.fetch(postUrl, params);
        if (response.getResponseCode() == 200) {
            return true;
        }
        Logger.log(response);
        return false;
    }
    catch (e) {
        var ret = e.message;
        console.log(ret);
    }
    return false;
}

