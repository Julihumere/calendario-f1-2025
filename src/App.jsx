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

function App() {
  const [thisWeekend, setThisWeekend] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const thisWeekend = getCurrentWeekend();
    if (thisWeekend) {
      setThisWeekend(thisWeekend);
      setActive(thisWeekend.id);
    }
  }, []);

  const changeWeekend = (id) => {
    const weekend = data.find((weekend) => weekend.id === id);
    console.log(weekend);

    setThisWeekend(weekend);
    setActive(id);
  };

  return (
    <main
      className="flex flex-col justify-between w-full h-full bg-center bg-cover bg-no-repeat backdrop-blur-10 z-0"
      style={{ backgroundImage: `url(${thisWeekend?.image})` }}
    >
      <div className="absolute top-0 left-0 right-0 -bottom-60 backdrop-blur-xs"></div>
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
          />
        ))}
      </Carousel>
      <Footer />
    </main>
  );
}

export default App;
