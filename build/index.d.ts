import Promise = require('bluebird');
/**
 * Represents a function that receives a Firebase token and sends it to the server.
 * The server should then store it as being associated with the user so that it can
 * later use the token to send push notifications to that user.
 */
export interface FnSendTokenToServer {
    (token: string): Promise<any>;
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
export declare function init(refWindow: any, refDocument: any, fnSendTokenToServer: FnSendTokenToServer): void;
