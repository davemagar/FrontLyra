import { useState } from 'react';

const BatchWorker = () => {
  const [jobs, setJobs] = useState([]);

  const lanzarJob = () => {
    const nuevoJob = {
      id: jobs.length + 1,
      nombre: `Job #${jobs.length + 1}`,
      estado: 'En proceso',
    };

    setJobs([nuevoJob, ...jobs]);

    // Simula que se completa en 3s
    setTimeout(() => {
      setJobs(prev =>
        prev.map(job =>
          job.id === nuevoJob.id ? { ...job, estado: 'Completado' } : job
        )
      );
    }, 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Batch Worker</h1>
      <p className="mb-4">Desde aquí puedes lanzar procesos batch de documentos.</p>
      <button
        onClick={lanzarJob}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Iniciar proceso batch
      </button>

      {jobs.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Historial de procesos</h2>
          <ul className="space-y-2">
            {jobs.map(job => (
              <li
                key={job.id}
                className="border p-3 rounded flex justify-between bg-gray-100"
              >
                <span>{job.nombre}</span>
                <span className={job.estado === 'Completado' ? 'text-green-600' : 'text-yellow-600'}>
                  {job.estado}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BatchWorker;
