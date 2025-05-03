
import { useState } from 'react';

const OnDemand = () => {
  const [fileName, setFileName] = useState(null);
  const [clientName, setClientName] = useState('');
  const [documentReady, setDocumentReady] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleGenerate = () => {
    if (clientName && fileName) {
      setDocumentReady(true);
    } else {
      alert('Faltan datos por completar.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lyra-yellow to-lyra-yellowLight px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
        Generar Documento On Demand
      </h1>
      <p className="text-gray-700 mb-8 text-center max-w-lg">
        Llena los datos y sube tu plantilla HTML para generar un documento personalizado.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Nombre del Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ej. Juan Pérez"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-yellow-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Plantilla HTML</label>
          <input
            type="file"
            accept=".html"
            onChange={handleFileUpload}
            className="w-full"
          />
          {fileName && <p className="text-sm mt-2 text-green-600">Archivo cargado: {fileName}</p>}
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 transition"
        >
          Generar Documento
        </button>

        {documentReady && (
          <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-md shadow text-center">
            ✅ Documento generado exitosamente. (Simulado)
          </div>
        )}
      </div>
    </div>
  );
};

export default OnDemand;
