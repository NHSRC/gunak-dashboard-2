import _ from 'lodash';
import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import ErrorView from 'src/views/errors/ErrorView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import LoginService from "./service/LoginService";

let createProtectedRoute = function (path, element) {
  return <PrivateRoute path={path}>
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
  {createProtectedRoute("/app/account", <AccountView/>)}
  {createProtectedRoute("/app/customers", <CustomerListView/>)}
  {createProtectedRoute("/app/dashboard/:program?/:assessment_tool?/:assessment_type?", <DashboardView/>)}
  {createProtectedRoute("/app/products", <ProductListView/>)}
  {createProtectedRoute("/app/settings", <SettingsView/>)}
  {/*<Route path='*' element={<Redirect to="/404"/>}/>*/}
  {createUnprotectedRoute("/login", <LoginView/>)}
  {createUnprotectedRoute("/register", <RegisterView/>)}
  {createUnprotectedRoute("/404", <ErrorView pageTitle={"404"} messageTitle={"404: The page you are looking for isn’t here"}
                                             message={"You either tried non-existent URL or you came here by mistake."}/>)}
  {createUnprotectedRoute("/noStateAccess", <ErrorView pageTitle={"No state access"} messageTitle={"Valid login. But no state access."}
                                                       message={"Please contact administrator and ask them to provide you access to your state."}/>)}
  {<Route path="/" exact={true}>
    <Redirect to="/app/dashboard"/>
  </Route>}
  {/*<Route path='*' element={<Redirect to="/404"/>}/>*/}
</Router>;

function PrivateRoute({children, ...rest}) {
  return (
    <Route {...rest}
           render={props => {
             return LoginService.isLoggedIn() ? (
               children
             ) : (
               <Redirect to="/login"/>
             )
           }}
    />
  );
}

export default routes;
