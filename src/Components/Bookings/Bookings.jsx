import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { Card } from "../Card/Card";

export default function Bookings() {
  const { token } = useContext(TokenContext);
  const [err, setErr] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getMe() {
      const res = await fetch(
        "https://tazkarti-backend-rho.vercel.app/api/users/my-bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        setErr(res.message);
      }

      const result = await res.json();

      if (result.status === "fail" || result.status === "error") {
        //   console.log("asdasd",result.);

        setErr(result.message);
        return;
      }
      //   console.log(result);
      setData(result.bookings);
    }
    getMe();
  }, [token]);

  //   console.log("noow", data);

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {data ? (
        data.map((el, index) => (
          <Booking key={el._id} booking={el} index={index} />
        ))
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-3xl font-bold text-indigo-400">
            you got no bookings
          </p>
        </div>
      )}
    </div>
  );
}

function Booking({ booking, index }) {
  console.log("book", booking._id);

  return (
    <div>
      <div className="text-indigo-600">Event: {index + 1}</div>
      <Card
        event={booking.event}
        showButton={false}
        cancelButton={true}
        bookingId={booking._id}
      />
    </div>
  );
}
