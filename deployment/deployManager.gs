


function archiveAllDeployment() {
    const latestDeploymentId = "YOUR_LATEST_DEPLOYMENT_ID_HERE"
    const deploylist = fetchDeployments()
    const parsedDeploylist = JSON.parse(deploylist).deployments
    const deleteList = parsedDeploylist.filter(deploy => deploy.deploymentId !== latestDeploymentId)

    deleteList.forEach(i => {
        return archiveDeployment(i.deploymentId)
    })
    console.log("completed")
}


function archiveDeployment(deploymentId) {
    try {
        var service = getOAuthService();
        if (service.hasAccess()) {
            var url = `https://script.googleapis.com/v1/projects/${PROJECT_ID}/deployments/${deploymentId}`;
            var response = UrlFetchApp.fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + service.getAccessToken(),
                    Accept: 'application/json',
                    muteHttpExceptions: true
                }
            });

            Logger.log(`Deployment ${deploymentId} archived.`);
        }
    } catch (error) {
        // continue
        Logger.log(`Deployment ${deploymentId} caused an error. ${error}`)
    }
}