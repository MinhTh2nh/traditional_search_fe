import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const User = JSON.parse(localStorage.getItem('User'));
    return(
        User ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes