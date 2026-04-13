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
import AdminDashboardLayout from "./layouts/AdminDashboard";
import Stats from "./pages/AdminDashboard/components/Stats";
import Categories from "./pages/AdminDashboard/components/Categories";
import UnderDevelopment from "./pages/AdminDashboard/components/UnderDevelopment";
import Products from "./pages/AdminDashboard/components/Products";
import { Toaster } from "sonner";
import { AdminProtectedRoute } from "./components/auth/ProtectedRoute";
import Brands from "./pages/AdminDashboard/components/Brands";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton:
              "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton:
              "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          },
        }}
      />
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

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboardLayout />}>
            {/* Index redireciona ou mostra Stats */}
            <Route index element={<Stats />} />
            <Route path="dashboard" element={<Stats />} />

            {/* Rotas Ativas */}
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="brands" element={<Brands />} />

            {/* Rotas em Desenvolvimento */}
            <Route
              path="orders"
              element={<UnderDevelopment title="Orders" />}
            />
            <Route path="users" element={<UnderDevelopment title="Users" />} />
            <Route
              path="shipping"
              element={<UnderDevelopment title="Shipping" />}
            />
            <Route
              path="change-password"
              element={<UnderDevelopment title="Change Password" />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
