import "./App.css";
import data from "./json/data.json";
import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";

function App() {
  const today = new Date();

  const currentDay = today.getDay();

  let daysUntilSaturday = (6 - currentDay + 7) % 7;
  let daysUntilSunday = (7 - currentDay + 7) % 7;

  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  nextSaturday.setHours(0, 0, 0, 0);

  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  nextSunday.setHours(0, 0, 0, 0);

  const year = nextSaturday.getFullYear();
  const month =
    nextSaturday.getMonth() + 1 < 10
      ? `0${nextSaturday.getMonth() + 1}`
      : nextSaturday.getMonth() + 1;
  const day =
    nextSaturday.getDate() < 10
      ? `0${nextSaturday.getDate()}`
      : nextSaturday.getDate();

  const todayFormatted = `${year}-${month}-${day}`;

  const thisWeekend = data.find((item) =>
    item.weekend?.includes(todayFormatted)
  );

  return (
    <main
      className="container-main w-full h-screen bg-center bg-cover bg-no-repeat backdrop-blur-10"
      style={{ backgroundImage: `url(${thisWeekend?.image})` }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-xs"></div>
      <div className="flex flex-col items-center justify-between pt-20 h-full text-white relative z-10">
        <div className="w-3/4 relative flex flex-col items-center justify-center rounded-2xl p-10 max-[500px]:w-[90%]">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-60 rounded-2xl -z-10"></div>
          <h1
            className="text-6xl font-black text-white text-center max-[500px]:text-2xl"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          >
            {thisWeekend?.name} - {thisWeekend?.hashtag}
          </h1>
          <div className="w-full mt-4">
            {thisWeekend?.weekend && (
              <h1 className="w-full bg-primary text-5xl py-2 px-4 font-black tracking-widest max-[500px]:text-3xl">
                Viernes {thisWeekend.weekend[0].split("-")[2]}
              </h1>
            )}
            {thisWeekend?.friday.map((item, index) => (
              <div
                key={index}
                className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
              >
                <h1 className="text-4xl text-secondary font-bold max-[500px]:text-2xl">
                  {item.time}
                </h1>
                <h3 className="text-4xl text-white font-bold ml-4 max-[500px]:text-2xl">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
          <div className="w-full mt-4">
            {thisWeekend?.weekend && (
              <h1 className="w-full bg-primary text-5xl py-2 px-4 font-black tracking-widest max-[500px]:text-3xl">
                Sabado {thisWeekend.weekend[1].split("-")[2]}
              </h1>
            )}
            {thisWeekend?.saturday.map((item, index) => (
              <div
                key={index}
                className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
              >
                <h1 className="text-4xl text-secondary font-bold max-[500px]:text-2xl">
                  {item.time}
                </h1>
                <h3 className="text-4xl text-white font-bold ml-4 max-[500px]:text-2xl">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
          <div className="w-full mt-4">
            {thisWeekend?.weekend && (
              <h1 className="w-full bg-primary text-5xl py-2 px-4 font-black tracking-widest max-[500px]:text-2xl">
                Domingo {thisWeekend.weekend[2].split("-")[2]}
              </h1>
            )}
            {(thisWeekend?.sunday ?? []).map((item, index) => (
              <div
                key={index}
                className="pl-4 w-full h-18 flex items-center border-b-[1px] border-white"
              >
                <h1 className="text-4xl text-secondary font-bold max-[500px]:text-2xl">
                  {item.time}
                </h1>
                <h3 className="text-4xl text-white font-bold ml-4 max-[500px]:text-2xl">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <footer className="w-full">
          <div className="w-full flex items-center justify-between px-10 h-16 bg-gray-900 text-white">
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
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
