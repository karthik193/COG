import React from 'react'
import { Navigate } from 'react-router-dom'
export default function PrivateRoute({ children }) {
    if (!localStorage.getItem("logged")) {
        return <Navigate to="/" />
    }
    else {
        return children
    }
}
