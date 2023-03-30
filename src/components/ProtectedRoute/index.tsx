import { Route, Redirect } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";
import User from "../../store/user";
import alert from "../../store/alert";
import { protectedRouteProps } from "../../interfaces";

const ProtectedRoute = observer(
  ({ path, children, checkRoles }: protectedRouteProps) => {
    if (User.isAuth) {
      if (checkRoles) {
        if (checkRoles?.includes(User.role)) {
          return (
            <Route exact path={path}>
              {children}
            </Route>
          );
        } else {
          alert.openAlert(
            5000,
            "error",
            "You are not privileged to view this page"
          );
          return <Redirect to={"/"} />;
        }
      } else {
        return (
          <Route exact path={path}>
            {children}
          </Route>
        );
      }
    } else {
      if (path.includes(":")) {
        path = path.replace(":id", location?.href?.split("/")?.at(-1) ?? "");
      }
      User.assignPageToRedirect(path);
      return <Redirect to={"/logIn"} />;
    }
  }
);

export default ProtectedRoute;
