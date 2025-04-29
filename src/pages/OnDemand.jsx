import { useState } from 'react';

const OnDemand = () => {
  const [docName, setDocName] = useState('');
  const [mensaje, setMensaje] = useState('');

  const generarDocumento = (e) => {
    e.preventDefault();

    if (!docName) {
      setMensaje('Por favor ingresa un nombre de documento.');
      return;
    }

    setMensaje('Generando documento...');

    setTimeout(() => {
      setMensaje(`✅ Documento "${docName}" generado correctamente.`);
      setDocName('');
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Generar Documento On Demand</h1>
      <form onSubmit={generarDocumento} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Nombre del documento"
          className="border p-2 rounded"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Generar
        </button>
      </form>

      {mensaje && (
        <p className="mt-4 text-blue-600 font-medium">{mensaje}</p>
      )}
    </div>
  );
};

export default OnDemand;
