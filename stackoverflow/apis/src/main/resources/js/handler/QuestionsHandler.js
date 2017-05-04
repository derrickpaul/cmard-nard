/**
 * Handles operations related to questions.
 */
var logger = Java.type("io.vertx.core.logging.LoggerFactory").getLogger("js.handler.QuestionsHandler");
var QuestionsHandler = {
    postQuestion : function(rc) {
        
    },
    searchQuestions : function(rc) {
        rc.response().write('{"status": "success"}').end();
    },
    getQuestionById : function(rc) {
        rc.response().write('{"status": "success"}').end();
    },
    updateQuestion : function(rc) {

    }
}