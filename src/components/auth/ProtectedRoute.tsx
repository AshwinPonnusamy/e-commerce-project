import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store/store';

export const ProtectedRoute = () => {
    const isLoggedIn = useSelector((state: RootState) => state.authData.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export const AdminRoute = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.authData);
    const { role } = useSelector((state: RootState) => state.userData);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (role !== 'admin') {
        return <Navigate to="/layout/home" replace />;
    }

    return <Outlet />;
};
