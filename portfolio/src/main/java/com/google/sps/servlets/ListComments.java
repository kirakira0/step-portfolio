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
    // TRY CATCH IF PARSE IN FAILS
    int limit = 3; 
    if (request.getParameter("numComments") != null) {
        limit = Integer.parseInt(request.getParameter("numComments")); 
    }
    List<Entity> topResults = results.asList(FetchOptions.Builder.withLimit(limit));


    List<Comment> listOfComments = new ArrayList<>();
    // for (Entity entity : results.asIterable()) {
    for (Entity entity : topResults) {

      Comment comment = Comment.convertToComment(entity); // convert from entity to comment object
      listOfComments.add(comment);
    }

    // String json = Comment.convertToJson(listOfComments.subList(0, 4));
        String json = Comment.convertToJson(listOfComments);

    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

/*
*
*/ 
  private int getNumberOfComments(HttpServletRequest request) throws IOException {
    String nCommentsString = request.getParameter("number-comments");
    int nComments;
    nComments = Integer.parseInt(nCommentsString);


    return 0; 
  }

}
