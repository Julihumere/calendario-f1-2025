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
import Spinner from "./components/Spinner";
import { startWeekend } from "./utils/startWeekend";
import Countdown from "./components/CountDown";
import LeaderBoard from "./components/LeaderBoard";

const width = window.innerWidth;

function App() {
  const [thisWeekend, setThisWeekend] = useState(null);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [close, setClose] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [fechaObjetivo, setFechaObjetivo] = useState(null);

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    const gpQuery = queryString.get("GP");

    const gp = gpMapping.find((gp) => gp.country === gpQuery);

    const thisWeekend = getCurrentWeekend(gp?.id ?? 3);
    const countDownTimer = startWeekend(gp?.id ?? 3);
    setFechaObjetivo(countDownTimer);

    if (thisWeekend) {
      setThisWeekend(thisWeekend);
      setActive(thisWeekend.id);
    }
  }, []);

  const changeWeekend = (id) => {
    setTimeout(() => {
      const weekend = data.find((weekend) => weekend.id === id);
      const countDownTimer = startWeekend(weekend?.id);
      setFechaObjetivo(countDownTimer);
      setThisWeekend(weekend);
      setActive(id);
    }, 800);
    setClose(true);
    setMounted(false);
    scrollToTop();

    setTimeout(() => {
      setShowIcon(true);
    }, 1000);

    setTimeout(() => {
      setClose(false);
      setMounted(true);
      setShowIcon(false);
    }, 2000);
  };
  console.log(width);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Spinner
      close={close}
      mounted={mounted}
      showIcon={showIcon}
      setClose={setClose}
      setMounted={setMounted}
      setShowIcon={setShowIcon}
    >
      <main className=" flex flex-col justify-between w-full h-auto bg-[#0D0D0D] text-white">
        <div className="w-full flex items-center justify-end px-12 py-5 z-10 max-[500px]:flex-col">
          <Countdown fechaObjetivo={fechaObjetivo} name={thisWeekend?.name} />
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
            className="w-[150px] bg-[#101828] h-[50px] flex items-center m-0 justify-around px-4 py-2 rounded-md cursor-pointer max-[500px]:mt-5"
          >
            <FaShareAlt size={24} color="white" />{" "}
            <span className=" text-white text-lg text-center m-0">
              Compartir
            </span>
          </button>
        </div>
        <div className="flex items-center justify-around w-full mt-10 max-[500px]:flex-col">
          <div className="h-full w-[45%] max-[500px]:w-full">
            <MasterCard thisWeekend={thisWeekend} />
          </div>
          <div className="h-full w-[45%] max-[500px]:w-full max-[500px]:mt-5">
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
          itemsToShow={width < 500 ? 2 : 5}
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
              country={item.infoTrack.location}
            />
          ))}
        </Carousel>
        <LeaderBoard />
        <Footer />
        <ToastContainer />
      </main>
    </Spinner>
  );
}

export default App;
