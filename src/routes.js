import _ from 'lodash';
import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
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
  {createProtectedRoute("/app/dashboard", <DashboardView/>)}
  {createProtectedRoute("/app/products", <ProductListView/>)}
  {createProtectedRoute("/app/settings", <SettingsView/>)}
  {/*<Route path='*' element={<Redirect to="/404"/>}/>*/}
  {createUnprotectedRoute("/login", <LoginView/>)}
  {createUnprotectedRoute("/register", <RegisterView/>)}
  {createUnprotectedRoute("/404", <NotFoundView/>)}
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
