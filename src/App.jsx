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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const [thisWeekend, setThisWeekend] = useState(null);
  const [active, setActive] = useState(0);
  // const [mounted, setMounted] = useState(false);
  // const [close, setClose] = useState(true);
  // const [showIcon, setShowIcon] = useState(true);
  const [fechaObjetivo, setFechaObjetivo] = useState(null);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWidthScreen(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const changeWeekend = (id) => {
    const weekend = data.find((weekend) => weekend.id === id);
    const countDownTimer = startWeekend(weekend?.id);
    setFechaObjetivo(countDownTimer);
    setThisWeekend(weekend);
    setActive(id);

    // setClose(true);
    // setMounted(false);
    // scrollToTop();

    // setTimeout(() => {
    //   setShowIcon(true);
    // }, 1000);

    // setTimeout(() => {
    //   setClose(false);
    //   setMounted(true);
    //   setShowIcon(false);
    // }, 2000);
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

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <SkeletonTheme baseColor="#0D0D0D" highlightColor="#101828">
      <main className=" flex flex-col justify-between w-full h-auto bg-[#0D0D0D] text-white">
        {loading ? (
          <div className="w-full flex items-center justify-between px-12 py-5 z-10 max-[500px]:flex-col">
            <Skeleton width={1000} height={40} />
            <Skeleton width={150} height={50} />
          </div>
        ) : (
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
        )}

        {loading ? (
          <div className="w-full flex items-center justify-around px-12 py-5 z-10 max-[500px]:flex-col">
            <Skeleton width={900} height={750} />
            <Skeleton width={900} height={750} />
          </div>
        ) : (
          <div className="flex items-center justify-around w-full mt-10 max-[500px]:flex-col">
            <div className="min-h-[750px] w-[45%] max-[500px]:w-full">
              <MasterCard thisWeekend={thisWeekend} />
            </div>
            <div className="min-h-[750px] w-[45%] max-[500px]:w-full max-[500px]:mt-5">
              {thisWeekend && (
                <CardInfo
                  info={thisWeekend?.infoTrack}
                  track2D={thisWeekend?.track2D}
                />
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="w-full flex items-center justify-around px-12 py-5 z-10 max-[500px]:flex-col">
            <Skeleton width={400} height={300} />
            <Skeleton width={400} height={300} />
            <Skeleton width={400} height={300} />
            <Skeleton width={400} height={300} />
          </div>
        ) : (
          <Carousel
            className="my-10"
            itemsToShow={
              (widthScreen < 500 && 2) || (widthScreen < 768 && 3) || 4
            }
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
        )}
        <LeaderBoard loading={loading} />
        <Footer />
        <ToastContainer />
      </main>
    </SkeletonTheme>
  );
}

export default App;
