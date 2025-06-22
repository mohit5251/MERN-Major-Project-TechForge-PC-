import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "./components/layout/AppLayout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import { ErrorPage } from "./components/layout/ErrorPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { AuthProvider } from "./store/AuthUser";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ForgotPasswordToken } from "./pages/ForgotPasswordToken";
import { Profile } from "./pages/ProfilePage";
import { ChangeName } from "./pages/ChangeName";
import { VerifyEmail } from "./pages/VerifyEmail";
import { VerificationSuccess } from "./pages/VerifyEmailToken";
import { AdminLayout } from "./admin_pages/AdminLayout";
import { InsertCategory } from "./admin_pages/InsertCategory";
import { Category } from "./admin_pages/Category";
import { AdminContent } from "./admin_pages/AdminContent";
import { UpdateCategory } from "./admin_pages/UpdateCategory";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProductsPage } from "./pages/ProductsPage";
import { InsertProduct } from "./admin_pages/InsertProducts";
import { ProductsAdmin } from "./admin_pages/ProductAdmin";
import { UpdateProducts } from "./admin_pages/UpdateProduct";
import { PreBuildPcsAdmin } from "./admin_pages/PreBuildPcsAdmin";
import { InsertPreBuildPcs } from "./admin_pages/InsertPreBuildPcs";
import { UpdatePc } from "./admin_pages/UpdatePc";
import { PrebuidPCs } from "./pages/PrebuidPCs";
import { Details } from "./pages/Details";
import { UserAdmin } from "./admin_pages/UsersAdmin";
import { UpdateUser } from "./admin_pages/UpdateUser";
import { CartPage } from "./pages/CartPage";
import { SecureRoute } from "./components/layout/SecureRoute";
import { ShippingAddress } from "./pages/ShippingAddress";
import { PaymentSelection } from "./pages/PaymentSelection";
import { CheckOutPage } from "./pages/CheckOutPage";
import { OrdersPage } from "./pages/OrdersPage";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout/>,
      errorElement: <ErrorPage/>,
      children:[
        {
        path: "/",
        element: <Home/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword/>,
        },
        {
          path: "/forgot-password/:token",
          element: <ForgotPasswordToken/>,
        },
        {
          path: "/profile",
          element: <Profile/>,
        },
        {
          path: "/change-name/:id",
          element: <ChangeName/>,
        },
        {
          path: "/verify-email",
          element: <VerifyEmail/>,
        },
        {
          path: "/verify-email-success",
          element: <VerificationSuccess/>,
        },
        {
          path: "/products/:category",
          element: <ProductsPage />,
        },
        {
          path: "/prebuild-pcs",
          element: <PrebuidPCs />
        },
        {
          path: "/details/:name",
          element: <Details />
        },
        {
          path: "/orders",
          element: <OrdersPage />
        },
        {
          path: "/cart",   //Secure Route for Cart
          element: <SecureRoute />,
          children: [
            { 
            path: "/cart",
            element: <CartPage />
           },
           {
            path: "/cart/shipping-address",
            element: <ShippingAddress />
           },
           {
            path:"/cart/payment",
            element: <PaymentSelection />
           },
           {
            path: "/cart/checkout",
            element: <CheckOutPage />,
           }
          ]
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/admin",
          element: <AdminContent />
        },
        {
          path: "/admin/category",
          element: <Category />
        },
        {
          path: "/admin/category/add",
          element: <InsertCategory />
        },
        {
          path: "/admin/category/edit/:id",
          element: <UpdateCategory />
        },
        {
          path: "/admin/products/add",
          element: <InsertProduct/>,
        },
        {
          path: "/admin/products",
          element: <ProductsAdmin />,
        },
        {
          path: "/admin/products/edit/:id",
          element: <UpdateProducts/>,
        },
        {
          path: "/admin/pcs",
          element: <PreBuildPcsAdmin />
        },
        {
          path: "/admin/pcs/add",
          element: <InsertPreBuildPcs />
        },
        {
          path: "/admin/pcs/edit/:id",
          element: <UpdatePc />
        },
        {
          path: "/admin/users",
          element: <UserAdmin />
        },
        {
          path: "/admin/users/edit/:id",
          element: <UpdateUser />
        }
      ]
    }
    
  ]);


  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} >
      <AuthProvider >

        <RouterProvider router={router}/>
        
        <ReactQueryDevtools />
      </AuthProvider>
    </QueryClientProvider>
  )

}

export default App;