import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function InputData() {
  const navigate = useNavigate();
  function inputs(datas) {
    datas.preventDefault();
    const name = datas.target.name.value;
    const email = datas.target.email.value;
    const password = datas.target.password.value;
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    fetch("http://localhost:8080/users", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/");
        }
      });
  }
  function navToTable() {
    navigate("/");
  }
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={inputs} className="w-96">
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
              className="border-2 w-full h-10 rounded-lg p-4 border-black mb-5"
            />
          </label>
          <label className="">
            <div className="">Email</div>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 w-full h-10 rounded-lg p-4 border-black mb-5"
            />
          </label>
          <label className="">
            <div className="">Password</div>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 w-full h-10 rounded-lg p-4 border-black mb-5"
            />
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
