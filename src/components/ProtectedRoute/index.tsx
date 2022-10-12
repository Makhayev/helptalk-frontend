import { Route, Redirect } from "react-router-dom";
import React from "react";
import { observer } from "mobx-react-lite";
import User from "../../mobx/user";
interface protectedRouteProps {
  path: string;
  children: React.ReactNode;
}

const ProtectedRoute = observer(({ path, children }: protectedRouteProps) => {
  if (User.isAuth) {
    return <Route path={path}>{children}</Route>;
  } else {
    return <Redirect to={"/login"} />;
  }
});

export default ProtectedRoute;
