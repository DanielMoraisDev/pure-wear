import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Navbar from "@/layouts/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/produtos"
          element={
            <>
              {/* <Navbar /> */}
              <Shop />
              {/* <Footer /> */}
            </>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
