import React from "react";
import type { AppProps } from "next/app";
import AnimatedCursor from "react-animated-cursor";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <div className="App">
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          color="193, 11, 111"
          clickables={["a", "button", ".link"]}
          innerStyle={{
            backgroundColor: "rgb(193, 11, 111)",
            mixBlendMode: "exclusion",
          }}
          outerStyle={{
            border: "3px solid rgb(193, 11, 111)",
            mixBlendMode: "exclusion",
          }}
          trailingSpeed={18}
        />
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

export default MyApp;
