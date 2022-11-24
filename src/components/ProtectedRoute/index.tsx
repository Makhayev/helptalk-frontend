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
    return (
      <Route exact path={path}>
        {children}
      </Route>
    );
  } else {
    User.assignPageToRedirect(path);
    return <Redirect to={"/logIn"} />;
  }
});

export default ProtectedRoute;
