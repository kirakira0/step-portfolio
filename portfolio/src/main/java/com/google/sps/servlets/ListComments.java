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

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.FetchOptions;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import com.google.gson.Gson;
import com.google.sps.servlets.models.Comment;

/*
 * Servlet responsible for generating a list of comments
 */ 
@WebServlet("/list-comments")
public class ListComments extends HttpServlet {

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
    int limit = 5; 
    if (request.getParameter("limit") != null) {
      try {
        limit = Integer.parseInt(request.getParameter("limit"));
        limit = java.lang.Math.max(limit, 1); //set min limit to 1
        limit = java.lang.Math.min(limit, 50); //set max limit to 50 
      } catch (NumberFormatException e) {
        System.err.println(request.getParameter("limit") + "is not an integer");
      }
    }
    
    List<Entity> limitedResults = results.asList(FetchOptions.Builder.withLimit(limit));
    List<Comment> listOfComments = new ArrayList<>();
    for (Entity entity : limitedResults) {
      Comment comment = new Comment(entity); 
      listOfComments.add(comment);
    }

    String json = convertToJson(listOfComments);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /**
   * Converts comments instance into a JSON string using the Gson library. 
   */
  public String convertToJson(List<Comment> comments) {
    Gson gson = new Gson();
    String json = gson.toJson(comments);
    return json;
  }
  
}