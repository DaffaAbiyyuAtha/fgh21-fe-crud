import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";

function InputData() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: inputs,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(1, "Minimum 1 characters")
        .max(50, "Must be 50 characters or less")
        .required("Required!"),
      email: Yup.string().email("Invalid email address").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
  });

  async function inputs(values) {
    const formData = new URLSearchParams();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      window.alert("Input Data User is Success");
      navigate("/");
    } else {
      window.alert("Error");
      console.log("error");
    }
  }

  function navToTable() {
    navigate("/");
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={formik.handleSubmit} className="w-96">
          <button
            type="button"
            onClick={navToTable}
            className="flex items-center mb-10 gap-5 font-semibold"
          >
            <FaArrowLeft className="" />
            <div className="">Back To Table</div>
          </button>
          <div className="font-bold text-2xl text-center mb-10">Input Data</div>
          <label className="">
            <div className="">Nama</div>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={
                formik.errors.name && formik.touched.name
                  ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-5"
              }
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </label>
          <label className="">
            <div className="">Email</div>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.errors.email && formik.touched.email
                  ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-5"
              }
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </label>
          <label className="">
            <div className="">Password</div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.errors.password && formik.touched.password
                  ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-5"
              }
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </label>
          <button
            type="submit"
            className="w-full bg-black h-10 rounded-lg text-white"
          >
            Save Data
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputData;
