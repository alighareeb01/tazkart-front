import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900">
      <div className="mx-auto flex min-h-full flex-col justify-center  py-8 lg:px-8  ">
        <div className="  sm:mx-auto sm:w-full sm:max-w-sm ">
          <p className="mx-auto text-center text-sm/6 text-gray-400">
            Welcome To Our Site?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Book An Event
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
