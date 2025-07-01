import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Authentication/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/chats" component={ChatPage} />
          <Route path="/login" component={Login} /> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
