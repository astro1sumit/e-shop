import { createBrowserRouter } from "react-router-dom";
import Shop from "./Shop";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/ShoppingCart";
import { loadProductBySlug } from "./routes/products";
import SearchPage from "./pages/SearchPage/SearchPage";
import BillingPage from "./pages/BillingPage/BillingPage"; 
import WishlistPage from "./pages/WishlistPage/WishlistPage";

export const router = createBrowserRouter([
  { 
    path: "/", 
    element: <ShopApplicationWrapper/>,
    children: [
      {
        path: "/", 
        element: <Shop />,
      },
      {
        path: "women", 
        element: <ProductListPage categoryType="women" />, 
      },
      {
        path: "men", 
        element: <ProductListPage categoryType="men" />, 
      },
      {
        path: "kid", 
        element: <ProductListPage categoryType="kid" />, 
      },
      {
        path:"product/:slug",
        loader: loadProductBySlug,
        element: <ProductDetailsPage />
      },
      {
        path: "cart-items", 
        element: <CartPage />, 
      },
      // ADD THIS NEW ROUTE
      {
        path: "billing",
        element: <BillingPage />,
      },
      {
        path: "search",
        element: <SearchPage />
      },
      {
        path: "wishlist",
        element: <WishlistPage />
      },
    ]
  },{
    basename: "localhost:3000"
  }
]);