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
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private List<String> greetings;

  @Override
  public void init() {
    greetings = new ArrayList<>();
    greetings.add("Howdy!");
    greetings.add("What is up my dude?");
    greetings.add("How are you?"); 
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    //Convert string to JSON
    String json = convertToJsonUsingGson(greetings); 

    // Send the JSON as the response
    response.setContentType("application/json;");
    response.getWriter().println(json);

  }

  /**
   * Converts greetings instance into a JSON string 
   */
  private String convertToJson(List<String> greetings) {
    String json = "{";
    json += "\"greetings\": ";
		json += greetings; 
		json += "}";
    return json;
  }


  /**
   * Converts greetings instance into a JSON string using the Gson library. 
   */
  private String convertToJsonUsingGson(List<String> greetings) {
    Gson gson = new Gson();
    String json = gson.toJson(greetings);
    return json;
  }

}
