import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import ErrorView from 'src/views/errors/ErrorView';
import RegisterView from 'src/views/auth/RegisterView';
import FacilityView from 'src/views/facilityView';
import SettingsView from 'src/views/settings/SettingsView';
import LoginService from "./service/LoginService";

let createProtectedRoute = function (path, element) {
  return <PrivateRoute exact path={path}>
    <DashboardLayout>
      {element}
    </DashboardLayout>
  </PrivateRoute>;
};

let createUnprotectedRoute = function (path, element) {
  return <Route path={path}>
    <MainLayout>
      {element}
    </MainLayout>
  </Route>;
};

const routes = <Router>
  <Switch>
    {createProtectedRoute("/dashboard/account", <AccountView/>)}
    {createProtectedRoute('/dashboard/facilityView', <FacilityView/>)}
    {/*{createProtectedRoute("/customers", <CustomerListView/>)}*/}
    {createProtectedRoute("/dashboard", <DashboardView/>)}
    {/*{createProtectedRoute("/app/products", <ProductListView/>)}*/}
    {createProtectedRoute("/dashboard/settings", <SettingsView/>)}
    {/*<Route path='*' element={<Redirect to="/404"/>}/>*/}
    {createUnprotectedRoute("/dashboard/login", <LoginView/>)}
    {createUnprotectedRoute("/dashboard/register", <RegisterView/>)}
    {createUnprotectedRoute("/dashboard/404", <ErrorView pageTitle={"404"} messageTitle={"404: The page you are looking for isn’t here"}
                                                         message={"You either tried non-existent URL or you came here by mistake."}/>)}
    {createUnprotectedRoute("/dashboard/noStateAccess", <ErrorView pageTitle={"No state access"} messageTitle={"Valid login. But no state access."}
                                                                   message={"Please contact administrator and ask them to provide you access to your state."}/>)}
    {<Route path="/">
      <Redirect to="/dashboard"/>
    </Route>}
  </Switch>
  {/*<Route path='*' element={<Redirect to="/404"/>}/>*/}
</Router>;

function PrivateRoute({children, ...rest}) {
  return (
    <Route {...rest}
           render={props => {
             return LoginService.isLoggedIn() ? (
               children
             ) : (
               <Redirect to="/dashboard/login"/>
             )
           }}
    />
  );
}

export default routes;
