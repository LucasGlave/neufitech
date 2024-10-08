import React, { useEffect, useState } from "react";
import Head from "next/head";
import Home from "../components/home/Home";
import Verification from "../components/Verification";

export default function HomePage() {
  let [validation, setValidation] = useState("");

  useEffect(() => {
    let validationStored = localStorage.getItem("cyh8hpfej");
    if (!validationStored) {
      localStorage.setItem("cyh8hpfej", "fbayhcvluy");
      setValidation("fbayhcvluy");
    } else {
      setValidation(validationStored);
    }
  }, []);
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
        {validation === "svKHOibAd2l457jh" ? (
          <Home />
        ) : (
          <Verification setter={validationSetter} />
        )}
        {/* <Home /> */}
      </div>
    </React.Fragment>
  );
}
