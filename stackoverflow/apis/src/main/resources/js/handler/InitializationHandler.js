/**
 * Handler to catch and handle any exception or forced failure from any of the
 * API handlers. This handler will return corresponding status code and end the
 * response.
 */
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.handler.InitializationHandler");
var InitializationHandler = {
    handle : function(rc) {
        // Log the request in trace mode.
        if (logger.isTraceEnabled()) {
            logger.trace("Request received: " + rc.request().method() + " " + rc.request().uri());
        }
        
        // Set the response as chunked and content type.
        rc.response().setChunked(true).putHeader("content-type", "application/json");
        rc.next();
    }
}