import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

function InputData() {
  const navigate = useNavigate();
  let { id } = useParams();
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
  const [data, setData] = React.useState({});
  async function datas() {
    const dataHome = await fetch("http://localhost:8080/users" + "/" + id, {});
    const listData = await dataHome.json();
    setData(listData.result);
  }
  function inputs(values) {
    const formData = new URLSearchParams();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    fetch("http://localhost:8080/users" + "/" + id, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/");
        }
      });
  }

  useEffect(() => {
    datas();
  }, []);
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              id="name"
              className={
                formik.errors.email && formik.touched.email
                  ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-5"
                  : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-5"
              }
              defaultValue={data.name}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
              className={
                formik.errors.email && formik.touched.email
                  ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-5"
                  : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-5"
              }
              defaultValue={data.email}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </label>
          <label className="">
            <div className="">Password</div>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              id="password"
              className={
                formik.errors.email && formik.touched.email
                  ? "border border-red-500 rounded-md p-[5px] block w-full focus:text-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-5"
                  : " border border-black rounded-md p-[5px] block w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 mb-5"
              }
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">{formik.errors.name}</p>
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
