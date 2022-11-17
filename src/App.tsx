import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Collaborate from "./pages/Collaborate";
import { observer } from "mobx-react-lite";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import PsychologistPage from "./pages/PsychologistPage";
import SignUpSpecialist from "./pages/SignUpSpecialist";

const App = observer(() => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/signup"}>
          <SignUp />
        </Route>
        <Route exact path={"/signUpSpecialist"}>
          <SignUpSpecialist />
        </Route>
        <ProtectedRoute path={"/search"}>
          <Search />
        </ProtectedRoute>
        <ProtectedRoute path={"/collaborate"}>
          <Collaborate />
        </ProtectedRoute>
        <ProtectedRoute path={"/aboutUs"}>
          <AboutUs />
        </ProtectedRoute>
        <ProtectedRoute path={"/profile"}>
          <PsychologistPage />
        </ProtectedRoute>
        <Route path={"/"}>
          <MainPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
});
export default App;
