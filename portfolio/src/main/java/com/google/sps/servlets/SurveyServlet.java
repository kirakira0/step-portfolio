package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/survey")
public class SurveyServlet extends HttpServlet {

  private Map<String, Integer> subgenreVotes = new HashMap<>();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson(); 
    String json = gson.toJson(subgenreVotes);
    response.getWriter().println(json); 
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String subgenre = request.getParameter("subgenre");
    int currentVotes = subgenreVotes.containsKey(subgenre) ? subgenreVotes.get(subgenre) : 0;
    subgenreVotes.put(subgenre, currentVotes + 1);

    response.sendRedirect("/templates/comments.html");
  }

}