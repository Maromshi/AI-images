import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import AuthContext from "../Contexts/AuthContext";

export const Login = () => {
  const { login } = useContext(AuthContext); // login function
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      //   console.log(data);
      if (response.ok) {
        login(data.token); // save token in localstorage
        navigate("/"); // navigate home page
      } else {
        alert(data.message || "Login failed ");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
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
        <div className="mt-5 flex gap-5">
          <button
            type="submit"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};
