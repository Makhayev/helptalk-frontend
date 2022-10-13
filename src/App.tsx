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

const App = observer(() => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={"/login"}>
          <Login />
        </Route>
        <Route path={"/signup"}>
          <SignUp />
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
        <Route path={"/"}>
          <MainPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
});
export default App;