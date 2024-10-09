import React, { FormEvent, useState } from "react";

const Verification = ({ setter }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
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
