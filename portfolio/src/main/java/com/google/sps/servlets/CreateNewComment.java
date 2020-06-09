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
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import com.google.gson.Gson;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.sps.servlets.models.Comment;

/** Servlet responsible for creating new comments */
@WebServlet("/create-new-comment")
public class CreateNewComment extends HttpServlet {  

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Only logged-in users can add a comment
    response.setContentType("text/html"); // set response type

    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      String userEmail = userService.getCurrentUser().getEmail();
      response.getWriter().println("Hello " + userEmail + "! Now that you're logged in, feel free to leave a comment.");   
    } else {
      response.getWriter().println("Please log in to leave a comment.");   
    }
  }

  
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    // Only logged-in users can add a comment
    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      String username = request.getParameter("username"); // get the username from the form
      String commentContent = request.getParameter("comment"); // get the comment from the form

      response.setContentType("text/html"); // set response type

      Entity commentEntity = Comment.createNewCommentEntity(username, commentContent);
      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService(); // create instance of DatastoreService class
      datastore.put(commentEntity);

      response.sendRedirect("templates/comments.html"); // redirect back to the HTML page
    } else {
      response.sendRedirect("templates/comments.html"); // redirect back to the HTML page
    }

  }
}