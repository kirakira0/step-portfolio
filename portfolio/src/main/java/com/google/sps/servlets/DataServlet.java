// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

import com.google.sps.servlets.models.Comment;

@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private List<String> comments;

  @Override
  public void init() {
    comments = new ArrayList<>();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException { 
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Comment> listOfComments = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      Comment comment = Comment.convertToComment(entity); // convert from entity to comment object
      listOfComments.add(comment);
    }

    String json = Comment.convertToJson(listOfComments.subList(0, 4));
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String username = request.getParameter("username"); // get the username from the form
    String commentContent = request.getParameter("comment"); // get the comment from the form

    response.setContentType("text/html"); // set response type

    // TODO: PROHIBIT BLANK COMMENTS
    Entity commentEntity = Comment.createNewCommentEntity(username, commentContent);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService(); // create instance of DatastoreService class
    datastore.put(commentEntity);
    doGet(request, response);	
    
    response.sendRedirect("templates/comments.html"); // redirect back to the HTML page
  }

}
