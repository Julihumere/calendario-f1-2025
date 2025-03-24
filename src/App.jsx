import "./App.css";
import Footer from "./components/Footer";
import MasterCard from "./components/MasterCard";
import { getCurrentWeekend } from "./utils/getCurrentWeekend";
import { useEffect } from "react";
import { useState } from "react";
import data from "./json/data.json";
import Cards from "./components/Cards";
import Carousel from "react-elastic-carousel";
import CardInfo from "./components/CardInfo";
import { removeAccents, toCamelCase } from "./utils/normalize";
import { FaShareAlt } from "react-icons/fa";
import { clipboard } from "./utils/copyToClipboard";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { gpMapping } from "./constants";

function App() {
  const [thisWeekend, setThisWeekend] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const gpQuery = queryString.get("GP");

    const gp = gpMapping.find((gp) => gp.country === gpQuery);

    const thisWeekend = getCurrentWeekend(gp?.id);
    if (thisWeekend) {
      setThisWeekend(thisWeekend);
      setActive(thisWeekend.id);
    }
  }, []);

  const changeWeekend = (id) => {
    const weekend = data.find((weekend) => weekend.id === id);

    setThisWeekend(weekend);
    setActive(id);
  };

  const updateQueryString = (name) => {
    const queryString = new URLSearchParams();

    const nameWithoutAccents = removeAccents(name);
    const nameWithCamelCase = toCamelCase(nameWithoutAccents);

    const encodedName = encodeURIComponent(nameWithCamelCase);

    const gp = gpMapping.find((gp) => gp.country === nameWithCamelCase);

    if (gp) {
      queryString.set("GP", gp.country);
    } else {
      queryString.set("GP", encodedName);
    }
    window.history.pushState({}, "", `?${queryString.toString()}`);
  };

  const toastClipboard = () => {
    toast.success("Evento copiado!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <main
      className="flex flex-col justify-between w-full h-full bg-center bg-cover bg-no-repeat backdrop-blur-10 z-0"
      style={{ backgroundImage: `url(${thisWeekend?.image})` }}
    >
      <div className="absolute top-0 left-0 right-0 -bottom-60 backdrop-blur-xs"></div>
      <div className="w-full flex items-center justify-end px-12 py-5 z-10">
        <button
          onClick={() => {
            clipboard(window.location.href);
            toastClipboard();
            // navigator.share({
            //   title: "F1 Weekends",
            //   text: "Descubre los fines de semana de la F1",
            //   url: window.location.href,
            // });
          }}
          className="w-[150px] bg-[#101828] h-[50px] flex items-center m-0 justify-around px-4 py-2 rounded-md cursor-pointer"
        >
          <FaShareAlt size={24} color="white" />{" "}
          <span className=" text-white text-lg text-center m-0">Compartir</span>
        </button>
      </div>
      <div className="flex items-center justify-around h-[720px] w-full mt-10">
        <div className="h-full w-[45%]">
          <MasterCard thisWeekend={thisWeekend} />
        </div>
        <div className="h-full w-[45%]">
          {thisWeekend && (
            <CardInfo
              info={thisWeekend?.infoTrack}
              track2D={thisWeekend?.track2D}
            />
          )}
        </div>
      </div>
      <Carousel
        className="my-10"
        itemsToShow={5}
        enableAutoPlay={true}
        pagination={false}
        showArrows={false}
        autoPlaySpeed={5000}
      >
        {data.map((item) => (
          <Cards
            id={item.id}
            name={item.name}
            img={item.track2D}
            weekend={item.weekend}
            active={active}
            changeWeekend={changeWeekend}
            updateQueryString={updateQueryString}
            country={item.infoTrack.location.split(", ")[1]}
          />
        ))}
      </Carousel>
      <Footer />
      <ToastContainer />
    </main>
  );
}

export default App;
