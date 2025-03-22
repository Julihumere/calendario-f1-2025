import "./App.css";
import Footer from "./components/Footer";
import MasterCard from "./components/MasterCard";
import { getCurrentWeekend } from "./utils/getCurrentWeekend";
import { useEffect } from "react";
import { useState } from "react";
import data from "./json/data.json";
import Cards from "./components/Cards";
import Carousel from "react-elastic-carousel";
import { checkThisWeekend } from "./utils/checkThisWeekend";

function App() {
  const [thisWeekend, setThisWeekend] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const thisWeekend = getCurrentWeekend();
    setThisWeekend(thisWeekend);

    const actualWeekend = checkThisWeekend();
    setActive(actualWeekend.id);
  }, []);

  return (
    <main
      className="flex flex-col justify-between w-full h-full bg-center bg-cover bg-no-repeat backdrop-blur-10 z-0"
      style={{ backgroundImage: `url(${thisWeekend?.image})` }}
    >
      <MasterCard thisWeekend={thisWeekend} />
      {/* CREAR UN CARROUSEL */}
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
          />
        ))}
      </Carousel>
      <Footer />
    </main>
  );
}

export default App;
