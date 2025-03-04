import { Route, Routes, useLocation } from "react-router";
import { Toaster } from "react-hot-toast";

function App() {
  // const { pathname } = useLocation();
  // const excludePaths = ["/log-in", "/sign-up"];
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
      {/* {shouldShowHeaderFooter && <Header />} */}
      <Routes>
        {/* Routes */}
        {/* <Route index element={<HomePage />} /> */}
      </Routes>
      {/* {shouldShowHeaderFooter && <Footer />} */}
    </>
  );
}

export default App;
