import { Spin } from "antd";
import { Suspense, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { apiCallerWithToken } from "./config/configAxios";
import { authActions, authSelector } from "./redux/slices/authSlice";
import { userRoutes, publicRoutes, adminRoutes } from "./routes";
const App = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(authSelector);

  useEffect(() => {
    (async () => {
      if (accessToken) {
        try {
          const res = await apiCallerWithToken(accessToken, dispatch).get(
            "auth/my-profile"
          );
          const { code, message, data } = res.data;
          if (code === 200 || message === "Success") {
            dispatch(authActions.setProfile(data));
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [accessToken, dispatch]);

  function showRoutes(routes) {
    return (
      <Fragment>
        {routes.map((route, index) => {
          let Layout = route.layout;
          const Page = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Fragment>
    );
  }
  return (
    <Suspense
      fallback={
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Spin />
        </div>
      }
    >
      <Routes>
        {showRoutes(publicRoutes)}
        {user && showRoutes(userRoutes)}
        {user && user.accountRole === "Admin" && showRoutes(adminRoutes)}
      </Routes>
    </Suspense>
  );
};

export default App;
