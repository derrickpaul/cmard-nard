package com.cisco.cmad.so.verticle;

import com.cisco.cmad.so.service.UsersService;
import com.cisco.cmad.so.util.MongoUtil;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;

public class UserVerticle extends AbstractVerticle {

    private static Logger logger = LoggerFactory.getLogger(UserVerticle.class.getName());

    private UsersService usersService = new UsersService();

    @Override
    public void start(Future<Void> future) throws Exception {

        if (!MongoUtil.isInitialized())
            MongoUtil.initialize(vertx);

        logger.info("Initializing event consumers for Users.");
        vertx.eventBus().consumer("com.cisco.cmad.so.users.post", usersService::createUser);
        vertx.eventBus().consumer("com.cisco.cmad.so.users.search", usersService::searchUsers);
        vertx.eventBus().consumer("com.cisco.cmad.so.users.get", usersService::getUserById);
        vertx.eventBus().consumer("com.cisco.cmad.so.users.update", usersService::updateUser);
        vertx.eventBus().consumer("com.cisco.cmad.so.users.authenticate", usersService::authenticate);

        future.complete();
    }
}
