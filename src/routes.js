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
import {useAuth} from 'src/state/useAuth';

let createRoute = function (path, element) {
  return <Route path={path}>
    <DashboardLayout>
      {element}
    </DashboardLayout>
  </Route>;
};

const routes = <Router>
  {createRoute("/app/account", <AccountView/>)}
  {createRoute("/app/customers", <CustomerListView/>)}
  {createRoute("/app/dashboard", <DashboardView/>)}
  {createRoute("/app/products", <ProductListView/>)}
  {createRoute("/app/settings", <SettingsView/>)}
  {/*<Route path='*' element={<Redirect to="/404"/>}/>*/}
  <Route path='/' element={<MainLayout/>}>
    <Route path='login' element={<LoginView/>}/>
    <Route path='register' element={<RegisterView/>}/>
    <Route path='404' element={<NotFoundView/>}/>
    <Route path='/' element={<Redirect to="/app/dashboard"/>}/>
    <Route path='*' element={<Redirect to="/404"/>}/>
  </Route>
</Router>;

function PrivateRoute({children, ...rest}) {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        console.log(props);
        return auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }}
    />
  );
}

export default routes;
