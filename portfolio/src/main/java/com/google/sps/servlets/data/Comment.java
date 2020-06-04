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