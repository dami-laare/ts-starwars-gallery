import { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./App.css";
import Loading from "./Loading";
import logo from "./assets/logo.png";
import { StarWarsData } from "./data.interface";

function App() {
  const [dataSet, setDataSet] = useState(function (): StarWarsData[] {
    const init = new StarWarsData();

    return [init];
  });
  const [previous, setPrevious] = useState(() => [] as number[]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(Math.ceil(Math.random() * 87));
  const [next, setNext] = useState(() => [] as number[]);

  const fetchData: () => Promise<void> = useCallback(async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `https://akabab.github.io/starwars-api/api/all.json`
      );

      const data: StarWarsData[] = response.data;

      setDataSet(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-[#272b30] min-h-screen h-fit w-screen text-[#c8c8c8]">
      <img
        src={logo}
        alt="Logo"
        className="w-[5rem] h-auto absolute top-[1rem] left-[50%] translate-x-[-50%] "
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <button
            className="absolute top-[50%] left-[1rem] translate-y-[-50%]"
            onClick={() => {
              setNext((prev) => {
                prev.push(index);
                return prev;
              });
              if (previous.length > 0) {
                setIndex(previous[previous.length - 1]);
                previous.pop();
              }
            }}
          >
            <MdChevronLeft className="text-5xl animate-pulse" />
          </button>
          <button
            onClick={() => {
              setPrevious((prev) => {
                prev.push(index);
                return prev;
              });
              if (next.length > 0) {
                setIndex(next[next.length - 1]);
                setNext((prev) => {
                  prev.pop();
                  return prev;
                });
              } else {
                setIndex(Math.ceil(Math.random() * 87));
              }
            }}
            className="absolute top-[50%] right-[1rem] translate-y-[-50%] text-5xl animate-pulse "
          >
            <MdChevronRight className="text-5xl animate-pulse" />
          </button>
          {dataSet.map((d, i) => (
            <AnimatePresence>
              {i === index && (
                <motion.div
                  className={`w-full min-h-screen flex flex-col items-center pt-32 pb-8 gap-y-4 px-8`}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                >
                  {dataSet[index].image && (
                    <img
                      src={dataSet[index].image}
                      alt={dataSet[index].name}
                      className="w-[8rem] h-auto rounded-lg"
                    />
                  )}
                  <span>
                    <span className="font-bold text-sm">Name: </span>
                    <span className="text-sm">{dataSet[index].name}</span>
                  </span>
                  <span>
                    <span className="font-bold text-sm">Species: </span>
                    <span className="text-sm">{dataSet[index].species}</span>
                  </span>
                  {dataSet[index].species === "human" && (
                    <span>
                      <span className="font-bold text-sm">Gender: </span>
                      <span className="text-sm">{dataSet[index].gender}</span>
                    </span>
                  )}
                  <span>
                    <span className="font-bold text-sm">Eye Color: </span>
                    <span className="text-sm">{dataSet[index].eyeColor}</span>
                  </span>
                  <span>
                    <span className="font-bold text-sm">Height: </span>
                    <span className="text-sm">{dataSet[index].height}m</span>
                  </span>
                  {dataSet[index].homeworld && (
                    <span>
                      <span className="font-bold text-sm">Homeworld: </span>
                      <span className="text-sm">
                        {dataSet[index].homeworld}
                      </span>
                    </span>
                  )}
                  <span className="text-center">
                    <span className="font-bold text-sm">Affiliations: </span>
                    <ul className="grid grid-cols-3 space-x-4 gap-y-1 list-disc">
                      {dataSet[index].affiliations.map((a) => (
                        <li key={Math.random()} className="text-sm">
                          {a}
                        </li>
                      ))}
                    </ul>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
