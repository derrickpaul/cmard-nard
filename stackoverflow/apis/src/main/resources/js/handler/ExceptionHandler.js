/**
 * Handler to catch and handle any exception or forced failure from any of the
 * API handlers. This handler will return corresponding status code and end the
 * response.
 */
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.handler.ExceptionHandler");
var ExceptionHandler = {
    handle : function(rc) {
        var statusCode = -1;

        // Use status code from context, if its explicitly set.
        if (rc.statusCode() != null && rc.statusCode() > 0) {
            statusCode = rc.statusCode();
        }

        // Log the exception.
        logger.error("Exception received. Status code: " + rc.statusCode() + ". Request: " + rc.request().method() + " "
                + rc.request().uri(), rc.failure());

        if (rc.failure() != null) {
            // TODO : Set status code based on exception thrown.
            if (statusCode == -1) {
                statusCode = 500;
            }
        }

        rc.response().setStatusCode(parseInt(statusCode)).end();
    }
}