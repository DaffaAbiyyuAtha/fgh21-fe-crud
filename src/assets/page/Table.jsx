import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Table() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  useEffect(() => {
    async function data() {
      const dataHome = await fetch("http://localhost:8080/users", {});
      const listData = await dataHome.json();
      setData(listData.result);
    }
    data();
  }, []);
  function navToInput() {
    navigate("/inputdata");
  }
  function removeData(id) {
    fetch("http://localhost:8080/users" + "/" + id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("removed");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  removeData();
  //   async function removeData() {
  //     const dataHome = await fetch("http://localhost:8080/users" + "/" + id, {
  //       method: "DELETE",
  //     });
  //     const listData = await dataHome.json();
  //     setData(listData.result);
  //   }
  //   removeData();
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-80">
          <div className="bg-black h-10 flex items-center justify-center text-white rounded-md mb-10">
            <button onClick={navToInput} type="button">
              + Create User
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className="flex gap-1">
                      <button
                        type="button"
                        className="bg-black p-2 rounded-lg text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeData(item.id)}
                        type="button"
                        className="bg-black p-2 rounded-lg
                        text-white"
                      >
                        {" "}
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;