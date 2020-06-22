package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/survey")
public class SurveyServlet extends HttpServlet {

  private Map<String, Integer> subgenreToVotes;
  private List<String> surveyParticipants; 

  @Override
  public void init() {
    subgenreToVotes = new HashMap<>(); 
    surveyParticipants = new ArrayList<>(); 
  }

/*
 * Return the results of the survey 
 */ 
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {   
    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn() && !surveyParticipants.contains(userService.getCurrentUser().getEmail())) {
      Query query = new Query("Vote"); // get all of the vote entities
      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      PreparedQuery results = datastore.prepare(query);
      List<Entity> resultsList = results.asList(FetchOptions.Builder.withDefaults());
      for (Entity entity : resultsList) {
        // update results hashmap 
        String subgenre = (String) entity.getProperty("subgenre"); 
        int currentVotes = subgenreToVotes.containsKey(subgenre) ? subgenreToVotes.get(subgenre) : 0;
        subgenreToVotes.put(subgenre, currentVotes + 1); 
      }
    }
    response.setContentType("application/json");
    Gson gson = new Gson(); 
    String json = gson.toJson(subgenreToVotes);
    response.getWriter().println(json); 
  }

/*
 * Add the user's vote only if they are logged in and have not voted before
 */ 
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {  
    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn() && !surveyParticipants.contains(userService.getCurrentUser().getEmail())) {
      Entity voteEntity = new Entity("Vote");
      voteEntity.setProperty("email", userService.getCurrentUser().getEmail()); 
      voteEntity.setProperty("subgenre", request.getParameter("subgenre"));
      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(voteEntity);
      surveyParticipants.add(userService.getCurrentUser().getEmail()); 
    }  
  }

}