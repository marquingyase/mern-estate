import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { AboutPage } from "./pages/AboutPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Header } from "./components/nav/Header";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  // const { pathname } = useLocation();
  // const excludePaths = ["/sign-in", "/sign-up"];
  // const shouldShowHeaderFooter = !excludePaths.includes(pathname);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,

          success: {
            duration: 3000,
            style: {
              background: "green",
              color: "#fff",
            },
            iconTheme: {
              primary: "white",
              secondary: "green",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff",
            },
            duration: 3000,
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          },
        }}
      />
      <Header />
      <Routes>
        {/* Routes */}
        <Route index element={<HomePage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<AboutPage />} />
      </Routes>
      {/* {shouldShowHeaderFooter && <Footer />} */}
    </>
  );
}

export default App;
