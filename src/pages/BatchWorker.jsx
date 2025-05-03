
import { useState } from 'react';

const BatchWorker = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCsvFile(file.name);
  };

  const handleTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) setTemplateFile(file.name);
  };

  const handleStartProcess = () => {
    if (csvFile && templateFile) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setDone(true);
      }, 2000); // simulación de 2 segundos
    } else {
      alert('Debes subir ambos archivos para continuar.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lyra-yellow to-lyra-yellowLight px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Procesamiento Batch de Documentos
      </h1>
      <p className="text-gray-700 mb-10 text-center max-w-xl">
        Sube un archivo CSV y una plantilla HTML para generar documentos masivamente.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Archivo CSV</label>
          <input type="file" accept=".csv" onChange={handleCsvUpload} className="w-full" />
          {csvFile && <p className="text-sm mt-1 text-green-600">Archivo cargado: {csvFile}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Plantilla HTML</label>
          <input type="file" accept=".html" onChange={handleTemplateUpload} className="w-full" />
          {templateFile && <p className="text-sm mt-1 text-green-600">Archivo cargado: {templateFile}</p>}
        </div>

        <button
          onClick={handleStartProcess}
          className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-300 transition"
        >
          Iniciar Procesamiento
        </button>

        {processing && (
          <div className="mt-6 bg-blue-100 text-blue-800 p-4 rounded-md shadow text-center">
            ⏳ Procesando documentos...
          </div>
        )}

        {done && (
          <div className="mt-6 bg-green-100 text-green-800 p-4 rounded-md shadow text-center">
            ✅ Documentos generados exitosamente. (Simulado)
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchWorker;
