import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Authentication/Login";

function App() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? <Redirect to="/chats" /> : <HomePage />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/chats">
          {user ? <ChatPage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
