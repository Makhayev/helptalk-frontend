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
import User from "./store/user";
import SpecialistProfile from "./pages/SpecialistProfile";
import PatientProfile from "./pages/PatientProfile";
import PatientPageSpecialistView from "./pages/PatientPageSpecialistView";
import SpecialistPagePatientView from "./pages/SpecialistPagePatientView";
import Videochat from "./pages/Videochat";
import { ToastContainer, toast } from "react-toastify";
import Terms from "./pages/Terms";
const App = observer(() => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path={"/login"}>
          <ToastContainer
            position="top-left"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <Login />
        </Route>
        <Route exact path={"/signup"}>
          <SignUp />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Route>
        <Route exact path={"/signUpSpecialist"}>
          <SignUpSpecialist />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Route>
        <ProtectedRoute path={"/search"}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Collaborate />
        </ProtectedRoute>
        <Route path={"/aboutUs"}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AboutUs />
        </Route>
        <ProtectedRoute
          checkRoles={["admin", "specialist"]}
          path={"/patient/:id"}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <PatientPageSpecialistView />
        </ProtectedRoute>
        <ProtectedRoute
          checkRoles={["admin", "patient"]}
          path={"/specialist/:id"}
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <SpecialistPagePatientView />
        </ProtectedRoute>
        <ProtectedRoute path={"/profile"}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {User.role === "patient" ? (
            <PatientProfile />
          ) : User.role === "specialist" ? (
            <SpecialistProfile />
          ) : (
            <Profile />
          )}
        </ProtectedRoute>
        <Route path={"/videochat/:id"}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Videochat />
        </Route>
        <Route path={"/"}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
