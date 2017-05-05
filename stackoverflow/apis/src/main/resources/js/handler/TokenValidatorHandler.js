/**
 * Handler to validate if the request has a token if the token is still valid.
 * If token is not present or invalid, sends back an HTTP 401. If everything is
 * fine, does a rctx.next() to allow the ruquest to be processed.
 */
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.handler.TokenValidatorHandler");
var TokenValidatorHandler = {
    handle : function(rc) {
        var authenticated = false;
        var authHeader = rc.request().getHeader("Authorization");
        if (typeof authHeader !== "undefined" && authHeader != null && authHeader.startsWith("Bearer ")) {
            var jwtToken = authHeader.split("Bearer ")[1];
            // TODO : Validate token.

            // TODO : Set user info from token into context.

            rc.next();
        } else {
            TokenValidatorHandler.fail(rc);
        }
    },
    fail : function(rc) {
        logger.warn("Token validation failed. Request: " + rc.request().method() + " " + rc.request().uri());

        // Return HTTP 401 status.
        rc.response().setStatusCode(401).setStatusMessage(
                "Authentication failed. Missing or invalid Authorization token.").end();
    }
}