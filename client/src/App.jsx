import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
          <NavBar />
        </header>

        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route element={<ProtectedRoute />}>
              {/*Home page is protected */}
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
