import React, { Dispatch, SetStateAction } from "react";
import ButtonAnimation from "../ButtonAnimation";

type mapProps = {
  array: InteractionsArray;
  disableState: boolean;
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
};

const InteractiveMap = ({
  array,
  disableState,
  pageTitle,
  setPageTitle,
}: mapProps) => {
  return (
    <div className="flex flex-row justify-between gap-8 w-full h-full">
      <div>
        {pageTitle === "CATEGORIAS" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {array.map((category, index) => (
              <ButtonAnimation
                disabled={disableState ? true : false}
                key={index}
                innerText={category.title}
                speakText={category.title}
                titleSetter={setPageTitle}
                imagen={{
                  src: `${category.url}`,
                  width: 400,
                  height: 400,
                  add: "h-full w-full object-cover",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {array.map((category, index) =>
              category.title == pageTitle
                ? category.entries.map((entry, index) => (
                  <ButtonAnimation
                    disabled={disableState ? true : false}
                    key={index}
                    innerText={entry.frase}
                    speakText={entry.frase}
                    imagen={{
                      src: `${entry.url}`,
                      width: 400,
                      height: 400,
                      add: "h-full w-full object-cover",
                    }}
                  />
                ))
                : null
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
