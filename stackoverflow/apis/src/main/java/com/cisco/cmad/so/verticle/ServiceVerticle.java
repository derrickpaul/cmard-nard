package com.cisco.cmad.so.verticle;

import com.cisco.cmad.so.service.AnswersService;
import com.cisco.cmad.so.service.CommentsService;
import com.cisco.cmad.so.service.QuestionsService;
import com.cisco.cmad.so.util.MongoUtil;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class ServiceVerticle extends AbstractVerticle {
    private static Logger logger = LoggerFactory.getLogger(ServiceVerticle.class.getName());

    private QuestionsService questionsService = new QuestionsService();
    private CommentsService commentsService = new CommentsService();
    private AnswersService answersService = new AnswersService();

    @Override
    public void start(Future<Void> future) throws Exception {

        if (!MongoUtil.isInitialized())
            MongoUtil.initialize(vertx);

        logger.info("Initializing event consumers for Questions.");
        vertx.eventBus().consumer("com.cisco.cmad.so.questions.post", questionsService::postQuestion);
        vertx.eventBus().consumer("com.cisco.cmad.so.questions.search", questionsService::searchQuestions);
        vertx.eventBus().consumer("com.cisco.cmad.so.questions.get", questionsService::getQuestionById);
        vertx.eventBus().consumer("com.cisco.cmad.so.questions.update", questionsService::updateQuestion);

        logger.info("Initializing event consumers for Answers.");
        vertx.eventBus().consumer("com.cisco.cmad.so.answers.post", answersService::postAnswer);
        vertx.eventBus().consumer("com.cisco.cmad.so.answers.update", answersService::updateAnswer);

        logger.info("Initializing event consumers for Comments.");
        vertx.eventBus().consumer("com.cisco.cmad.so.questions.comments.post", commentsService::postCommentOnQuestion);
        vertx.eventBus().consumer("com.cisco.cmad.so.questions.comments.update", commentsService::updateCommentOnQuestion);
        vertx.eventBus().consumer("com.cisco.cmad.so.answers.comments.post", commentsService::postCommentOnAnswer);
        vertx.eventBus().consumer("com.cisco.cmad.so.answers.comments.update", commentsService::updateCommentOnAnswer);

        future.complete();
    }
}
