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

  public static Comment convertToComment(Entity entity) {
    long id = entity.getKey().getId();
    String username = (String) entity.getProperty("username");
    String content = (String) entity.getProperty("content");
    long timestamp = (long) entity.getProperty("timestamp");
    Comment comment = new Comment(id, username, content, timestamp);
    return comment;
  }

  /**
   * Converts comments instance into a JSON string using the Gson library. 
   */
  public static String convertToJson(List<Comment> comments) {
    Gson gson = new Gson();
    String json = gson.toJson(comments);
    return json;
  }

  public static Entity createNewCommentEntity(String content) {
    Entity commentEntity = new Entity("Comment");
    //TODO: LET USERS SET THEIR OWN NAMES
    commentEntity.setProperty("username", "TEST NAME");
    commentEntity.setProperty("content", content);
    commentEntity.setProperty("timestamp", System.currentTimeMillis());
    return commentEntity;
  }

}