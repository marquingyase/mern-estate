import { Route, Routes, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { About } from "./pages/About";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";

function App() {
  const { pathname } = useLocation();
  const excludePaths = ["/sign-in", "/sign-up"];
  const shouldShowHeaderFooter = !excludePaths.includes(pathname);

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
      {/* {shouldShowHeaderFooter && <Header />} */}
      <Routes>
        {/* Routes */}
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<About />} />
      </Routes>
      {/* {shouldShowHeaderFooter && <Footer />} */}
    </>
  );
}

export default App;
