import React from "react";
import Table from "./assets/page/Table";
import InputData from "./assets/page/InputData";
import UpdateData from "./assets/page/UpdateData";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Table />,
  },
  {
    path: "/inputdata",
    element: <InputData />,
  },
  {
    path: "/updatedata/:id",
    element: <UpdateData />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
