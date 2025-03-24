import React from "react";

import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-10 h-16 bg-gray-900 text-white z-10">
      <h1 className="text-2xl">Creado por Julio Humere</h1>
      <div className="flex">
        <FaLinkedin
          className="text-4xl mx-2 cursor-pointer hover:scale-120 transition-all duration-300"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/juli-humere/",
              "_blank",
              "noopener noreferrer"
            )
          }
        />
        <FaGithub
          className="text-4xl mx-2 cursor-pointer hover:scale-120 transition-all duration-300"
          onClick={() =>
            window.open(
              "https://github.com/Julihumere",
              "_blank",
              "noopener noreferrer"
            )
          }
        />

        <FaLink
          className="text-4xl mx-2 cursor-pointer hover:scale-120 transition-all duration-300"
          onClick={() =>
            window.open(
              "https://portfolio-julio-humere.vercel.app/",
              "_blank",
              "noopener noreferrer"
            )
          }
        />
      </div>
    </footer>
  );
}
