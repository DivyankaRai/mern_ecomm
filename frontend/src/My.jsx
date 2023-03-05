import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const My = () => {

    function getUsers() {
        return fetch("https://reqres.in/api/users").then((res) => res.json());
      }
      function UsersPage() {
        const [data, setData] = useState([]);
        useEffect(() => {
          getUsers().then((res) => {
            setData(res);
            console.log(res);
          });
        }, []);
  return (
    <div>
    <h1>Users</h1>
    {/* {data &&
      data.data &&
      data.data.map((item) => {
        return <div key={item.id}>{item.first_name}</div>;
      })} */}

    {data?.data?.map((item) => {
      return (
        <div key={item.id}>
          <Link to={`/users/${item.id}`}>{item.first_name}</Link>
        </div>
      );
    })}
  </div>
  )
}
}




