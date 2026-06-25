import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../Context/TokenContext";

export function Card({
  event,
  showButton = true,
  cancelButton = false,
  bookingId,
}) {
  const nav = useNavigate();

  const { token } = useContext(TokenContext);
  function getEvent() {
    console.log(event);
    nav(`/events/${event._id}`);
  }

  async function cancelBooking() {
    console.log("book id", bookingId);

    const res = await fetch(
      `https://tazkarti-backend-rho.vercel.app/api/bookings/${bookingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const result = await res.json();

    if (result.status === "fail" || result.status === "error") {
      //   console.log("asdasd",result.);

      console.log("SOMETHING WRONG WHILE CANCELLING THE EVENt");

      return;
    }
    window.location.reload();
    //   console.log(result);
  }

  return (
    <div className="bg-gray-800 border rounded-lg text-indigo-400   px-3 py-1.5 text-base  w-full  flex flex-col h-full ">
      <div className="">
        <img className="h-48 w-full p-5 object-cover" src={event.image} />
      </div>
      <div className="flex-1">
        <h2>
          <span className="text-indigo-400">Title </span>
          <span className="text-gray-400">: {event.title}</span>
        </h2>
        <h2>
          <span className="text-indigo-400">Price </span>
          <span className="text-gray-400">: {event.price}$</span>
        </h2>
        <h2>
          <span className="text-indigo-400">location </span>
          <span className="text-gray-400">: {event.location}</span>
        </h2>
        <h2>
          <span className="text-indigo-400">Category </span>
          <span className="text-gray-400">: {event.category}</span>
        </h2>
        <h2>
          <span className="text-indigo-400">date </span>
          <span className="text-gray-400">: {event.date?.split("T")[0]}</span>
        </h2>
        <h2>
          <span className="text-indigo-400">description </span>
          <span className="text-gray-400">: {event.description}</span>
        </h2>
        <h2>
          <span className="text-indigo-400">Available seats </span>
          <span className="text-gray-400">: {event.availableSeats}</span>
        </h2>
      </div>
      <div className="flex justify-center mt-1">
        {showButton && (
          <button
            onClick={getEvent}
            // disabled={loading}
            type="submit"
            className="disabled:hover:cursor-not-allowed flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Check Event
          </button>
        )}
        {cancelButton && (
          <button
            onClick={cancelBooking}
            // disabled={loading}
            type="submit"
            className="disabled:hover:cursor-not-allowed flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            cancel Event
          </button>
        )}
      </div>
    </div>
  );
}
