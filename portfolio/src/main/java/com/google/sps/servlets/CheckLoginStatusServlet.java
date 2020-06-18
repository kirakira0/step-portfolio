import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

/*
 * Returns the login status of the user
 */ 
@WebServlet("/check-login-status")
public class CheckLoginStatusServlet extends HttpServlet {

  @Override 
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    JSONObject user = new JSONObject();
    user.put("loggedIn", userService.isUserLoggedIn());
    if (userService.isUserLoggedIn()) {
      user.put("loggedIn", true);
      String userEmail = userService.getCurrentUser().getEmail();
      user.put("email", userEmail);
    } else {
      user.put("loggedIn", false);
    }
    
    response.setContentType("application/json");
    String json = new Gson().toJson(user);
    response.getWriter().println(json);
  }

}