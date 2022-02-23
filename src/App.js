import React, { useEffect } from "react";
import "./App.css";
import { UserState } from "./context/UserProvider";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPage from "./pages/ForgotPage";
import AppointmentPage from "./pages/AppointmentPage";
import TimeSlotPage from "./pages/TimeSlotPage";
function App() {
  const history = useHistory();
  const { user, setUser } = UserState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!user?.isAdmin ? history.push("/login") : <HomePage />}
        </Route>
        <Route exact path="/login">
          {user?.isAdmin ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPage />
        </Route>
        <Route exact path="/appointment">
          {!user ? <Redirect to="/login" /> : <AppointmentPage />}
        </Route>
        <Route exact path="/time-slot">
          {!user ? <Redirect to="/login" /> : <TimeSlotPage />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
