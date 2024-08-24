import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

/**
 * The `Analytics` function in JavaScript initializes state variables for data and inventoryData, as
 * well as an array of colors.
 */
const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
     
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  /* The `useEffect(() => { getBloodGroupData(); }, []);` is a React hook that is being used in the
  `Analytics` component. This specific `useEffect` hook is responsible for calling the
  `getBloodGroupData` function when the component mounts for the first time (due to the empty
  dependency array `[]`). */
  useEffect(() => {
    getBloodGroupData();
  }, []);

  
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
              <h1 className="card-title text-dark text-center mb-1">
                {record.bloodGroup}
              </h1>
              <p className="card-footer text-light  text-center">
                Total In : <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-footer text-light  text-center">
                Total Out : <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available = <b>{record.availabeBlood}</b> (ML)
            </div>
          </div>
        ))}
      </div>
      <div className="container my-3">
        <h1 className="text-center border-b-2 border-black inline-block pb-2">Blood Transactions</h1>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">TIme & Date</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Blood Group</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>{record.inventoryType}</td>
                <td>{record.bloodGroup}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
