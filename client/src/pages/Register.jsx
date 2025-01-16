import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Swal from "sweetalert2";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Registration successful!",
          text: data.message || "Registration successful! Please log in",
          icon: "success",
        });
        // alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Registration failed",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: data.message || "Registration failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      // alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName={"Username"}
            type={"text"}
            name={"username"}
            placeholder={"Please enter your username"}
            handleChange={handleChange}
            value={form.username}
          />
          <FormField
            labelName={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"Please enter your email"}
            handleChange={handleChange}
            value={form.email}
          />
          <FormField
            labelName={"Password"}
            type={"password"}
            name={"password"}
            placeholder={"Please enter your password"}
            handleChange={handleChange}
            value={form.password}
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
};
