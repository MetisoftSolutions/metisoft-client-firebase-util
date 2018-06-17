import _ = require('lodash');
import Promise = require('bluebird');



let __savedToken = '';

/**
 * Represents a function that receives a Firebase token and sends it to the server.
 * The server should then store it as being associated with the user so that it can
 * later use the token to send push notifications to that user.
 */
export interface FnSendTokenToServer {
  (token: string): Promise<any>
}



/**
 * 
 * @param refWindow 
 *    Pass in `window`.
 * @param refDocument
 *    Pass in `document`.
 * @param fnSendTokenToServer 
 *    The function to call to add the Firebase token on the server.
 */
export function init(refWindow: any, refDocument: any, fnSendTokenToServer: FnSendTokenToServer) {
  refDocument.addEventListener('deviceready', _.partial(__initFirebase, refWindow, fnSendTokenToServer), false);
}



function __initFirebase(refWindow: any, fnSendTokenToServer: FnSendTokenToServer) {
  refWindow.FirebasePlugin.grantPermission();

  refWindow.FirebasePlugin.getToken((token: string) => {
    __onGetOrRefreshToken(token, fnSendTokenToServer);
  }, (err: Error) => {
    console.error("Error in __initFirebase() getToken() call.");
    console.error(err);
  });

  refWindow.FirebasePlugin.onTokenRefresh((token: string) => {
    __onGetOrRefreshToken(token, fnSendTokenToServer);
  }, (err: Error) => {
    console.error("Error in __initFirebase() onTokenRefresh() call.");
    console.error(err);
  });
}



function __onGetOrRefreshToken(token: string, fnSendTokenToServer: FnSendTokenToServer) {
  if (token !== __savedToken) {
    __savedToken = token;

    fnSendTokenToServer(token)

      .catch((err: Error) => {
        console.error(`Error registering Firebase token (${token}) with the server.`);
        console.error(err);
      });
  }
}
