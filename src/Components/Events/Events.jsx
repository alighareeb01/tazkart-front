import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card/Card";

export default function Events() {
  // const [err, setErr] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/events",
      );
      // console.log(res);

      const result = await res.json();
      // if (!result.ok) {
      //   setErr(result.message);
      // }
      // console.log(result);

      setData(result.events);
    }

    getEvents();
  }, []);
  console.log(data);

  return (
    <div className="text-3xl font-bold  bg-gray-800">
      <div className="flex justify-end ">
        <span className="border rounded-lg px-3 py-1 bg-gray-800 mt-2">
          <div className="flex ">
            <p> Available Events :</p>
            <p> {data.length}</p>
          </div>
        </span>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
        {data.map((event) => (
          <Card key={event._id} event={event} showButton={true} />
        ))}
      </div>
    </div>
  );
}
