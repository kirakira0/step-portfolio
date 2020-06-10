package com.google.sps.servlets.models;

import com.google.appengine.api.datastore.Entity;
import java.util.List;
import com.google.gson.Gson;

public class Comment {

  private long id;
  private String username;
  private String content;
  private long timestamp;

  public Comment(long id, String username, String content, long timestamp) {
    this.id = id;
    this.content = content;
    this.username = username;
    this.timestamp = timestamp;
  }

  public Comment(Entity entity) {
    this.id = entity.getKey().getId();
    this.username = (String) entity.getProperty("username");
    this.content = (String) entity.getProperty("content");
    this.timestamp = (long) entity.getProperty("timestamp");
  }

  public static Entity createNewCommentEntity(String username, String content) {
    Entity commentEntity = new Entity("Comment");
    // set username 
    if (username.isBlank()) { commentEntity.setProperty("username", "ANONYMOUS"); } // if blank username
    else { commentEntity.setProperty("username", username); }
    // set comment content
    if (content.isBlank()) { commentEntity.setProperty("content", "The webpage was so cool, this user was left speechless!"); }
    else { commentEntity.setProperty("content", content); }
    commentEntity.setProperty("timestamp", System.currentTimeMillis());
    return commentEntity;
  }

}