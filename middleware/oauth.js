let GoogleAuth // Google Auth object.
function initClient() {
  gapi.client
    .init({
      apiKey: process.env.apiKey,
      clientId: process.env.clientId,
      scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ],
    })
    .then(() => {
      GoogleAuth = gapi.auth2.getAuthInstance()

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus)
    })
}

let isAuthorized
let currentApiRequest

/**
 * Store the request details. Then check to determine whether the user
 * has authorized the application.
 *   - If the user has granted access, make the API request.
 *   - If the user has not granted access, initiate the sign-in flow.
 */
function sendAuthorizedApiRequest(requestDetails) {
  currentApiRequest = requestDetails
  if (isAuthorized) {
    // Make API request
    // gapi.client.request(requestDetails)

    // Reset currentApiRequest variable.
    currentApiRequest = {}
  } else {
    GoogleAuth.signIn()
  }
}

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    isAuthorized = true
    if (currentApiRequest) {
      sendAuthorizedApiRequest(currentApiRequest)
    }
  } else {
    isAuthorized = false
  }
}
