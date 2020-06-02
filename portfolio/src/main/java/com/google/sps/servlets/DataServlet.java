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

@WebServlet("/data")
public class DataServlet extends HttpServlet {

  // ONLY TEMPORARILY STORING IN MEMORY
  private List<String> comments;

  @Override
  public void init() {
    comments = new ArrayList<>();
    // comments.add("Starter comment");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // create query instance of desired entity
    Query query = new Query("Comment").addSort("comment", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<String> listOfComments = new ArrayList<>();
    for (Entity entity : results.asIterable()) {

      String comment = (String) entity.getProperty("comment");

      listOfComments.add(comment);

    }

    // Convert string to JSON
    String json = convertToJsonUsingGson(listOfComments); 
    // Send the JSON as the response
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /**
   * Converts greetings instance into a JSON string using the Gson library. 
   */
  private String convertToJsonUsingGson(List<String> greetings) {
    Gson gson = new Gson();
    String json = gson.toJson(greetings);
    return json;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String comment = request.getParameter("comment"); // get the comment from the form
    response.setContentType("text/html"); // set response type

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("comment", comment);

    // add the comment to the comment list 
    comments.add(comment); 
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService(); // create instance of DatastoreService class
    datastore.put(commentEntity); // pass entity to datastore 

    response.sendRedirect("/index.html"); // redirect back to the HTML page

  }

}
