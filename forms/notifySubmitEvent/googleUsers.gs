/**
 * Lists all the users in a domain sorted by first name.
 */
function getCurrentAllUsers() {
    var _a;
    var pageToken;
    var page;
    var users = new Array();
    do {
        page = (_a = AdminDirectory.Users) === null || _a === void 0 ? void 0 : _a.list({
            customFieldMask: "Internal,Application_IDs",
            customer: "my_customer",
            projection: "custom",
            viewType: "domain_public",
            maxResults: 100,
            pageToken: pageToken
        });
        users.push(page.users);
        pageToken = page.nextPageToken;
    } while (pageToken);
    var userlist = users.flat();
    var custom_schema_for_each_member = userlist.filter(function (i) { return i.customSchemas != undefined; }).map(function (j) { return { "customSchema": j.customSchemas, "user": j.emails[0].address }; });
    return custom_schema_for_each_member;
}



function getSlackIDfromEmail(email) {
    var _a, _b;
    if (email === undefined)
        return;
    var users = getCurrentAllUsers();
    var slackId = (_b = (_a = users.find(function (i) { return i.user === email; })) === null || _a === void 0 ? void 0 : _a.customSchema.Application_IDs) === null || _b === void 0 ? void 0 : _b.Slack_ID;
    return slackId;
}



function getNicknamefromEmail(email) {
    var _a;
    if (email === undefined)
        return;
    var users = getCurrentAllUsers();
    var nickname = (_a = users.find(function (i) { return i.user === email; })) === null || _a === void 0 ? void 0 : _a.customSchema.Internal.nickname;
    return nickname;
}

