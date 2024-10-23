import React, { FormEvent, useState } from "react";
import ConfirmationModal from "./confirmation/confirmationModal";
import ButtonAnimation from "./ButtonAnimation";

const Verification = ({ setter }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalProps, setModalProps] = useState(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const responseStatus = await window.ipc.auth(code);
      if (responseStatus == 200) {
        console.log(responseStatus);
        setter();
      } else if (responseStatus == 401) {
        console.log(responseStatus);
        setMessage(
          "DNI verificado con anterioridad. Si esto es un error, comunicarse con Neufitech."
        );
      } else {
        console.log(responseStatus);
        setMessage(
          "Error al verificar DNI. Por favor, comuníquese con Neufitech."
        );
      }
    } catch (error) {
      setMessage("Error al verificar DNI. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowExit = () => {
    const showConfirmation = (question: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setModalProps({ question, resolve });
      });
    };
    showConfirmation("DESEA SALIR DE LA APLICACION?").then((confirmed) => {
      if (confirmed) {
        window.ipc.send("close", null);
      } else {
        setModalProps(null);
      }
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {modalProps !== null && (
        <ConfirmationModal
          question={modalProps.question}
          resolve={(result) => {
            modalProps.resolve(result);
          }}
        />
      )}
      <div className="absolute left-4 top-4 flex items-start gap-4">
          <ButtonAnimation
            state={handleShowExit}
            speakText="Salir"
            svg='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffff"></path> </g></svg>'
            propClass="w-[100px] h-[80px] text-xl"
          />
          <ButtonAnimation
            speakText="Minimizar"
            svg='<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>minimize_fill</title> <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="System" transform="translate(-192.000000, -240.000000)"> <g id="minimize_fill" transform="translate(192.000000, 240.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M2.5,12 C2.5,11.1716 3.17157,10.5 4,10.5 L20,10.5 C20.8284,10.5 21.5,11.1716 21.5,12 C21.5,12.8284 20.8284,13.5 20,13.5 L4,13.5 C3.17157,13.5 2.5,12.8284 2.5,12 Z" id="路径" fill="#ffffff"> </path> </g> </g> </g> </g></svg>'
            propClass="w-[100px] h-[80px] text-xl"
            execute={() => window.ipc.send("minimize", null)}
          />
        </div>
      <div className="w-2/6 rounded-lg flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center text-white uppercase">
          Verificación
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block text-2xl font-medium text-white mb-1 uppercase"
            >
              Ingresa tu DNI
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Aceptar"}
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes("error") || message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;
