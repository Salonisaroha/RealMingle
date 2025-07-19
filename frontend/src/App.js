import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Authentication/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <Switch>
        {/* Homepage route */}
        <Route
          exact
          path="/"
          render={() => (user ? <Redirect to="/chats" /> : <Homepage />)}
        />

        {/* Login route */}
        <Route
          path="/login"
          render={() => (user ? <Redirect to="/chats" /> : <Login />)}
        />

        <Route
          path="/chats"
          render={() =>
            user ? <ChatPage setUser={setUser} /> : <Redirect to="/" />
          }
        />

        {/* Fallback */}
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
