/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

const Spinner = ({
  children,
  close,
  mounted,
  showIcon,
  setShowIcon,
  setMounted,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000);

    setTimeout(() => {
      setShowIcon(false);
    }, 2000);
  }, []);

  return (
    <div
      style={{ zIndex: mounted ? 10 : -10 }}
      className="w-full h-full flex justify-center items-center overflow-hidden"
    >
      <div
        className={`w-1/2 h-screen z-10 bg-primary transition-transform duration-1000 ease-in-out ${
          (mounted && !close ? "-translate-x-300" : "translate-x-0",
          !mounted && close ? "translate-x-0" : "-translate-x-300")
        }`}
      ></div>
      {showIcon == true ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-20">
          <img
            src="/public/logo.webp"
            className={`absolute top-[43%] left-[46.5%] w-32 h-32 bg-white p-5 rounded-full z-20  ${
              showIcon
                ? "transition-transform duration-1000 ease-in-out transform scale-100"
                : "transition-transform duration-1000 ease-out transform scale-0"
            }`}
          />
        </div>
      ) : (
        <div className="absolute top-0 bottom-0 left-0 right-0 z-0">
          {children}
        </div>
      )}

      {/* Azul: se mueve de centro hacia la derecha */}
      <div
        className={`w-1/2 h-screen z-10 bg-primary transition-transform duration-1000 ease-in-out ${
          (mounted && !close ? "translate-x-300" : "translate-x-0",
          !mounted && close ? "translate-x-0" : "translate-x-300")
        }`}
      ></div>
    </div>
  );
};

export default Spinner;
