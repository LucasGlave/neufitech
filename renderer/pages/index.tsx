import React, { useEffect, useState } from "react";
import Head from "next/head";
import Home from "../components/home/Home";
import Verification from "../components/Verification";
import { arrayModel } from "../components/señal-comunicacion/mockArray";


export default function HomePage() {
  let [validation, setValidation] = useState("");
  const defaultConfig = {
    volume: 3,
    activation: 3,
    voices: "mujer",
  };
  const [config, setConfig] = useState({ ...defaultConfig });
  // const isProd = "production";
  const isProd = process.env.NODE_ENV;

  useEffect(() => {
    let validationStored = localStorage.getItem("cyh8hpfej");
    if (!validationStored) {
      localStorage.setItem("cyh8hpfej", "fbayhcvluy");
      setValidation("fbayhcvluy");
    } else {
      setValidation(validationStored);
    }
    if (localStorage.getItem("config")) {
      setConfig(JSON.parse(localStorage.getItem("config")));
    }
    let array = JSON.parse(localStorage.getItem("senal-comunicacion"));
    if (!array) {
      localStorage.setItem("senal-comunicacion", JSON.stringify(arrayModel));
    }
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("config")) {
      localStorage.setItem("config", JSON.stringify(config));
    }
  }, [config]);
  let validationSetter = () => {
    localStorage.setItem("cyh8hpfej", "svKHOibAd2l457jh");
    setValidation("svKHOibAd2l457jh");
  };
  return (
    <React.Fragment>
      <Head>
        <title>Neufitech - WebApp</title>
      </Head>
      <div className="bg-zinc-900">
        {isProd === "production" ? (
          validation === "svKHOibAd2l457jh" ? (
            <Home />
          ) : (
            <Verification setter={validationSetter} />
          )
        ) : (
          <Home />
        )}
      </div>
    </React.Fragment>
  );
}
