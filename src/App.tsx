import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Collaborate from "./pages/Collaborate";
import { observer } from "mobx-react-lite";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import SignUpSpecialist from "./pages/SignUpSpecialist";
import Profile from "./pages/AdminProfile";
import User from "./mobx/user";
import SpecialistProfile from "./pages/SpecialistProfile";
import PatientProfile from "./pages/PatientProfile";
import PatientPageSpecialistView from "./pages/PatientPageSpecialistView";
import SpecialistPagePatientView from "./pages/SpecialistPagePatientView";
import Videochat from "./pages/Videochat";
import Terms from "./pages/Terms";

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
          <Collaborate />
        </ProtectedRoute>
        <Route path={"/aboutUs"}>
          <AboutUs />
        </Route>
        <ProtectedRoute
          checkRoles={["admin", "specialist"]}
          path={"/patient/:id"}
        >
          <PatientPageSpecialistView />
        </ProtectedRoute>
        <ProtectedRoute
          checkRoles={["admin", "patient"]}
          path={"/specialist/:id"}
        >
          <SpecialistPagePatientView />
        </ProtectedRoute>
        <ProtectedRoute path={"/profile"}>
          {User.role === "patient" ? (
            <PatientProfile />
          ) : User.role === "specialist" ? (
            <SpecialistProfile />
          ) : (
            <Profile />
          )}
        </ProtectedRoute>
        <Route path={"/videochat/:id"}>
          <Videochat />
        </Route>
        <Route path={"/"}>
          <MainPage />
        </Route>
        <Route path={"/terms"}>
          <Terms />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
});
export default App;
