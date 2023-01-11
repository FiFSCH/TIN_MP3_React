import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {isAuthenticated} from "../../helpers/authHelper";

const ProtectedRoutes = () => isAuthenticated() ? (<Outlet/>) : (<Navigate to='/login'/>)
export default ProtectedRoutes;