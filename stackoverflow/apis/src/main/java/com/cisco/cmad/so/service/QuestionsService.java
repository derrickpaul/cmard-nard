package com.cisco.cmad.so.service;

import com.cisco.cmad.so.util.MongoUtil;

import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class QuestionsService {

    private static Logger logger = LoggerFactory.getLogger(QuestionsService.class.getName());

    public void postQuestion(Message<Object> message) {
        logger.debug("Posting question to database.");
        JsonObject document = new JsonObject(message.body().toString());

        MongoUtil.getMongoClient().insert("questions", document, reply -> {
            if (reply.succeeded()) {
                message.reply(reply.result());
            } else {
                logger.error("Error posting question to database", reply.cause());
                message.fail(500, "Database error.");
            }
        });
    }

    public void searchQuestions(Message<Object> message) {

    }

    public void getQuestionById(Message<Object> message) {

    }

    public void updateQuestion(Message<Object> message) {

    }

}
