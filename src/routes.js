import { lazy } from "react";
import { DashboardLayout, DefaultLayout, ProfileLayout } from "./layouts";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AccountOrderPage = lazy(() => import("./pages/AccountOrderPage"));
const SearchProductsPage = lazy(() => import("./pages/SearchProductsPage"));
const WishListPage = lazy(() => import("./pages/WishListPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const StatisticalPage = lazy(() => import("./pages/StatisticalPage"));
const NewUserPage = lazy(() => import("./pages/NewUserPage"));
const EditUserPage = lazy(() => import("./pages/EditUserPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const NewCategoryPage = lazy(() => import("./pages/NewCategoryPage"));
const EditCategoryPage = lazy(() => import("./pages/EditCategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const NewProductPage = lazy(() => import("./pages/NewProductPage"));
const EditProductPage = lazy(() => import("./pages/EditProductPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const EditOrderPage = lazy(() => import("./pages/EditOrderPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const EditInventoryPage = lazy(() => import("./pages/EditInventoryPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));

export const publicRoutes = [
  {
    path: "/",
    element: HomePage,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    element: LoginPage,
    layout: DefaultLayout,
  },
  {
    path: "/register",
    element: RegisterPage,
    layout: DefaultLayout,
  },
  {
    path: "/cart",
    element: CartPage,
    layout: DefaultLayout,
  },
  {
    path: "/product/:slug",
    element: ProductDetailPage,
    layout: DefaultLayout,
  },
  {
    path: "/search",
    element: SearchProductsPage,
    layout: DefaultLayout,
  },
  {
    path: "/product/category/:slug",
    element: ProductsPage,
    layout: DefaultLayout,
  },
  {
    path: "/payment",
    element: PaymentPage,
    layout: DefaultLayout,
  },
  {
    path: "/payment/success",
    element: PaymentSuccessPage,
    layout: DefaultLayout,
  },
  {
    path: "*",
    element: NotFoundPage,
    layout: DefaultLayout,
  },
];

export const userRoutes = [
  {
    path: "/profile",
    element: ProfilePage,
    layout: ProfileLayout,
  },
  {
    path: "/order",
    element: AccountOrderPage,
    layout: ProfileLayout,
  },
  {
    path: "/wish-list",
    element: WishListPage,
    layout: ProfileLayout,
  },
  {
    path: "/change-password",
    element: ChangePasswordPage,
    layout: ProfileLayout,
  },
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: DashboardPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/user",
    element: UserPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/user/new",
    element: NewUserPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/user/edit/:id",
    element: EditUserPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/category",
    element: CategoryPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/category/new",
    element: NewCategoryPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/category/edit/:id",
    element: EditCategoryPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/product",
    element: ProductPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/product/new",
    element: NewProductPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/product/edit/:id",
    element: EditProductPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/inventory",
    element: InventoryPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/inventory/edit/:id",
    element: EditInventoryPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/order",
    element: OrderPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/order/edit/:id",
    element: EditOrderPage,
    layout: DashboardLayout,
  },
  {
    path: "/admin/statistical",
    element: StatisticalPage,
    layout: DashboardLayout,
  },
];
