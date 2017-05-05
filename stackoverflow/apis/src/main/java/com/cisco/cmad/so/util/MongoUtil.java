package com.cisco.cmad.so.util;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.mongo.MongoClient;

public class MongoUtil {

    private static Logger logger = LoggerFactory.getLogger(MongoUtil.class.getName());

    private static MongoClient client = null;

    public static synchronized void initialize(Vertx vertx) {
        if (client != null)
            return;

        logger.info("Initializing mongo client");

        // TODO : Pick the configurations from JSON file.
        JsonObject config = new JsonObject();
        config.put("db_name", "cmad");
        config.put("connection_string", "mongodb://localhost:27017");
        client = MongoClient.createShared(vertx, config);
    }

    public static MongoClient getMongoClient() {
        return client;
    }

    public static boolean isInitialized() {
        return client != null;
    }
}
