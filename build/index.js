"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
let __savedToken = '';
/**
 *
 * @param refWindow
 *    Pass in `window`.
 * @param refDocument
 *    Pass in `document`.
 * @param fnSendTokenToServer
 *    The function to call to add the Firebase token on the server.
 */
function init(refWindow, refDocument, fnSendTokenToServer) {
    refDocument.addEventListener('deviceready', _.partial(__initFirebase, refWindow, fnSendTokenToServer), false);
}
exports.init = init;
function __initFirebase(refWindow, fnSendTokenToServer) {
    refWindow.FirebasePlugin.getToken((token) => {
        __onGetOrRefreshToken(token, fnSendTokenToServer);
    }, (err) => {
        console.error("Error in __initFirebase() getToken() call.");
        console.error(err);
    });
    refWindow.FirebasePlugin.onTokenRefresh((token) => {
        __onGetOrRefreshToken(token, fnSendTokenToServer);
    }, (err) => {
        console.error("Error in __initFirebase() onTokenRefresh() call.");
        console.error(err);
    });
}
function __onGetOrRefreshToken(token, fnSendTokenToServer) {
    if (token !== __savedToken) {
        __savedToken = token;
        fnSendTokenToServer(token)
            .catch((err) => {
            console.error(`Error registering Firebase token (${token}) with the server.`);
            console.error(err);
        });
    }
}
