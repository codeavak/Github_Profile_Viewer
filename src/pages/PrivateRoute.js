import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import loadingImage from '../images/preloader.gif';

const PrivateRoute = ({children,...rest}) => {

  const {
    isLoading,
    isAuthenticated,
    user
  } = useAuth0();
  const isUser=isAuthenticated&&user;
 if(isLoading)
 return <main style={{width:'100px',height:'100px'}}><img src={loadingImage} alt='loading' /></main>
 else return <Route {...rest} render={()=>{return isUser?children:<Redirect to='/login'/>}}>
  </Route>
};
export default PrivateRoute;
