import React, { Dispatch, SetStateAction, useState } from "react";
import ButtonAnimation from "../ButtonAnimation";
import ConfirmationModal from "../confirmation/confirmationModal";

type mapProps = {
  array: InteractionsArray;
  disableState: boolean;
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
  setArraySeñales: Dispatch<SetStateAction<InteractionsArray>>;
  setDeleteInteraction: Dispatch<SetStateAction<boolean>>;
};

const DeletionMap = ({
  array,
  disableState,
  pageTitle,
  setArraySeñales,
  setDeleteInteraction,
}: mapProps) => {
  const [modalProps, setModalProps] = useState(null);
  const handleDelete = (titulo: string) => {
    const showConfirmation = (question: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setModalProps({ question, resolve });
      });
    };
    showConfirmation(
      pageTitle === "CATEGORIAS"
        ? "¿DESEA ELIMINAR LA CATEGORIA?"
        : "¿DESEA ELIMINAR LA ACTIVIDAD?"
    ).then((confirmed) => {
      if (confirmed) {
        let señales = JSON.parse(
          localStorage.getItem("senal-comunicacion")
        ) as InteractionsArray;
        if (pageTitle == "CATEGORIAS") {
          const index = señales.findIndex(
            (category) => category.title === titulo
          );
          señales.splice(index, 1);
        } else {
          const indexCategoria = señales.findIndex(
            (category) => category.title === pageTitle
          );
          const indexEntry = señales[indexCategoria].entries.findIndex(
            (entry) => entry.frase === titulo
          );
          señales[indexCategoria].entries.splice(indexEntry, 1);
        }
        localStorage.setItem("senal-comunicacion", JSON.stringify(señales));
        setArraySeñales(señales);
        setDeleteInteraction(false);
      } else {
        setDeleteInteraction(false);
        setModalProps(null);
      }
    });
  };

  return (
    <div className="flex flex-row justify-between gap-8 w-full h-full">
      {modalProps !== null && (
        <ConfirmationModal
          question={modalProps.question}
          resolve={(result) => {
            modalProps.resolve(result);
          }}
        />
      )}
      <div className="w-full h-full flex flex-col gap-8">
        <div className="h-full w-full">
          {pageTitle === "CATEGORIAS" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {array.map((category, index) => (
                <ButtonAnimation
                  disabled={disableState ? true : false}
                  key={index}
                  innerText={category.title}
                  speakText={category.title}
                  interactionDeleter={handleDelete}
                  buttonBorder="border-red-500"
                  propClass="aspect-square"
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
                        propClass="aspect-square"
                        imagen={{
                          src: `${entry.url}`,
                          width: 400,
                          height: 400,
                          add: "h-full w-full object-cover",
                        }}
                        interactionDeleter={handleDelete}
                        buttonBorder="border-red-500"
                      />
                    ))
                  : null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletionMap;
