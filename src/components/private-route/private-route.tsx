import { Fragment, memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "../../route/AppRoutes";
import useAuthStore from "../../store/authStore";

type Props = {
	isAuthRoute?: boolean;
	layout?: any;
	isPrivate?: boolean;
};
export const PrivateRoute = memo(({ isAuthRoute, isPrivate, layout: Layout = Fragment }: Props) => {
	const { user } = useAuthStore();

	if (isAuthRoute && user?.accessToken) {
		return <Navigate to={AppRoutes.dashboard} replace />;
	}
	if (isPrivate && !user?.accessToken) {
		return <Navigate to={AppRoutes.auth.login} replace />;
	}
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
});
