import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
	const loggedIn = sessionStorage.getItem('loggedIn');
  return loggedIn === 'true';
};

export default function ProtectedRoute() {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to="/" />;
}
