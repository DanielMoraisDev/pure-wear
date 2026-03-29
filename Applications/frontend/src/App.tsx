import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import NotFound from "@/pages/NotFound";
import Product from "@/pages/Product";
import ScrollToTop from "./components/scrollToTop";
import Cart from "./pages/Cart";
import AuthPage from "./pages/Auth";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Shop />
              <Footer />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Auth />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Auth initialType={"register"} />
            </>
          }
        />
        <Route
          path="/admin/login"
          element={
            <>
              <Auth initialType={"loginAdmin"} />
            </>
          }
        />
        <Route
          path="/admin/register"
          element={
            <>
              <Auth initialType={"registerAdmin"} />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Navbar />
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
