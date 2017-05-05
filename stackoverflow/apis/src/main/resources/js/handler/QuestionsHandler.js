/**
 * Handles operations related to questions.
 */
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.handler.QuestionsHandler");
var QuestionsHandler = {
    postQuestion : function(rc) {
        var input = rc.getBodyAsJson();
        var question = {};

        // Validate input attributes and populate domain model.
        if (input == null) {
            rc.response().setStatusCode(422).setStatusMessage("Empty request").end();
            return;
        }

        if (input.text && typeof input.text === 'string' && input.text.trim().length > 0) {
            question.text = input.text;
        } else {
            rc.response().setStatusCode(422).setStatusMessage("Attribute 'text' is empty.").end();
            return;
        }

        if (input.tags) {
            if (Array.isArray(input.tags)) {
                question.tags = input.tags.toString().split(",");
            } else {
                rc.response().setStatusCode(422).setStatusMessage(
                        "Attribute 'tags' if present, has to be an array of String").end();
                return;
            }
        }

        // Populate user and meta-data attributes.

        // TODO : Take user info from principal.
        // var principal = rc.user().principal();
        // question.userId = principal.userId;
        // question.userName = principal.userName;

        question.userId = "derpaul@cisco.com";
        question.userName = "Derrick Paul";

        question.createdTime = (new Date()).getTime();
        question.voteCount = 0;
        question.viewCount = 0;
        question.comments = [];
        question.answers = [];

        vertx.eventBus().send("com.cisco.cmad.so.questions.post", question, function(result, error) {
            if (error) {
                rc.fail(error);
            } else {
                rc.response().setStatusCode(201).putHeader("location", result.body()).end();
            }
        });
    },
    searchQuestions : function(rc) {
        rc.response().write('{"status": "success"}').end();
    },
    getQuestionById : function(rc) {
        var questionId = rc.request().getParam("questionId");
        if (questionId == null || questionId.trim().length == 0) {
            rc.response().setStatusCode(404).setStatusMessage("Empty question ID").end();
            return;
        }

        vertx.eventBus().send("com.cisco.cmad.so.questions.get", questionId, function(result, error) {
            if (error) {
                rc.fail(error);
            } else if (result.body() == null) {
                rc.response().setStatusCode(404).setStatusMessage("Not found").end();
            } else {
                rc.response().setStatusCode(200).write(result.body()).end();
            }
        });
    },
    updateQuestion : function(rc) {

    }
}