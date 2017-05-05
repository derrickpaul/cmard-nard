/**
 * Holds all the REST API route definitions.
 */

var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.router.RestApiRouter");

var RestApiRouter = {
    router : null,

    create : function() {
        var Router = require("vertx-web-js/router");
        this.router = Router.router(vertx);

        logger.info("Configuring routes for all REST API.");

        load("classpath:js/handler/UsersHandler.js");
        load("classpath:js/handler/QuestionsHandler.js");
        load("classpath:js/handler/AnswersHandler.js");
        load("classpath:js/handler/CommentsHandler.js");

        // Users and authentication handlers
        this.router.post("/users").handler(UsersHandler.createUser);
        this.router.get("/users").handler(UsersHandler.searchUsers);
        this.router.get("/users/:userId").handler(UsersHandler.getUserById);
        this.router.patch("/users/:userId").handler(UsersHandler.updateUser);
        this.router.post("/tokens").handler(UsersHandler.generateToken);

        // Questions handlers
        this.router.post("/questions").handler(QuestionsHandler.postQuestion);
        this.router.get("/questions").handler(QuestionsHandler.searchQuestions);
        this.router.get("/questions/:questionId").handler(QuestionsHandler.getQuestionById);
        this.router.patch("/questions/:questionId").handler(QuestionsHandler.updateQuestion);

        // Answers handlers
        this.router.post("/questions/:questionId/answers").handler(AnswersHandler.postAnswer);
        this.router.patch("/questions/:questionId/answers/:answerId").handler(AnswersHandler.updateAnswer);

        // Comments handlers
        this.router.post("/questions/:questionId/comments").handler(CommentsHandler.postCommentOnQuestion);
        this.router.patch("/questions/:questionId/comments/:commentId").handler(CommentsHandler.updateCommentOnQuestion);
        this.router.post("/questions/:questionId/answers/:answerId/comments").handler(CommentsHandler.postCommentOnAnswer);
        this.router.patch("/questions/:questionId/answers/:answerId/comments/:commentId").handler(CommentsHandler.updateCommentOnAnswer);

        return this;
    }
}