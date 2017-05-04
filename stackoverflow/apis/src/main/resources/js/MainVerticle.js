/**
 * Entry point for all the server. Here are the key purposes for this Verticle:
 * <br>
 * 1. Define routes for all the APIs. <br>
 * 2. Deploy verticles. <br>
 * 3. Initialize standard handlers like static handler, HTTP body handler, token
 * validator handler, etc. <br>
 * 4. Initialize framework level tasks like logging, exception handling, etc.
 */

var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.MainVerticle");
logger.info("Initializing main verticle, routers and framework handlers");
// Create router instance.
var Router = require("vertx-web-js/router");
var router = Router.router(vertx);

// Add handler for static content.
// TODO : Check if this is required. May be for Swagger UI?
var StaticHandler = require("vertx-web-js/static_handler");
router.route("/static/*").handler(StaticHandler.create().setWebRoot("web").handle);

// Handle exceptions from any of the REST APIs.
load("classpath:js/handler/ExceptionHandler.js");
router.route("/apis/*").failureHandler(ExceptionHandler.handle);

// Sets chunked response, content type and trace logs.
load("classpath:js/handler/InitializationHandler.js");
router.route("/apis/*").handler(InitializationHandler.handle);

// Add handler to validate JWT token for all write operations.
load("classpath:js/handler/TokenValidatorHandler.js");
router.route("/apis/*").method("POST").method("PUT").method("PATCH").method("DELETE").handler(
        TokenValidatorHandler.handle);

// Add handler to process HTTP body.
var BodyHandler = require("vertx-web-js/body_handler");
router.route("/apis/*").handler(BodyHandler.create().handle);

// Add sub-router which defines handlers for all REST APIs.
load("classpath:js/router/RestApiRouter.js");
router.mountSubRouter("/apis", RestApiRouter.create().router);

// Create and start the server.
// TODO : Pick port from configuration JSON.
var serverPort = 8080;
var server = vertx.createHttpServer();
server.requestHandler(router.accept).listen(serverPort);
logger.info("Server started on port " + serverPort);