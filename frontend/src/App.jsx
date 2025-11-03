import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/admin/Login";
import Signup from "./components/admin/Signup";
import Blogs from "./pages/Blogs";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comment from "./pages/admin/Comment";
import { useAuthStote } from "./store/useAuth";

const App = () => {
  const { authUser, checkAuth } = useAuthStote();

  // Call checkAuth once on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Log authUser whenever it changes
  useEffect(() => {
    console.log("authUser updated:", authUser);
  }, [authUser]);

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1A1A1A",
            color: "#fff",
            fontSize: "15px",
            borderRadius: "12px",
            padding: "12px 18px",
            border: "1px solid #2d2d2d",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            maxWidth: "400px",
          },
          iconTheme: {
            primary: "#3B82F6",
            secondary: "#1A1A1A",
          },
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/admin" replace /> : <Login />}
        />
        <Route path="/blog/:id" element={<Blogs />} />

        <Route
          path="/admin"
          element={authUser ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comment" element={<Comment />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
