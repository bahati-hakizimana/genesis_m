import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthanticated, user, children}) {

    const location = useLocation();

    if(!isAuthanticated && !(location.pathname.includes('/login') || location.pathname.includes('/signup'))){
        return <Navigate to='/auth/login' />
    }
    if(isAuthanticated && (location.pathname.includes('/login') || location.pathname.includes('/signup'))){

        if(user?.role === 'admin'){
            return <Navigate to='/admin' />
        }else{
            return <Navigate to='/unauth-page' />
        }
        
    }

    if(isAuthanticated && user?.role !== 'admin' && location.pathname.includes('admin')){
      return <Navigate to="/employee" />
    }
    if(isAuthanticated && user?.role =='admin' && location.pathname.includes('employee')){
        return <Navigate to="/admin" />
    }

    return <>{children}</>
}

export default CheckAuth
