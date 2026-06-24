import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  bg-gray-800">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Welcome tou our site?
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Book an event
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
