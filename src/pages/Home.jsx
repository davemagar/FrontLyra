import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lyra-yellow to-lyra-yellowLight flex flex-col items-center px-6 py-16">
      <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">Bienvenido a Lyra CCM</h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl justify-items-center">

        {/* Crear Plantilla */}
        <Link to="/ondemand" className="block">
          <div className="bg-white w-64 h-64 rounded-full shadow-lg flex flex-col justify-center items-center p-6 transition hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M6 8h12M6 16h.01M6 12h.01" />
            </svg>
            <h2 className="text-lg font-bold text-gray-800">Crear Nueva Plantilla</h2>
            <p className="text-sm text-gray-600 text-center">Genera documentos individuales al instante.</p>
          </div>
        </Link>

        {/* Procesos Batch */}
        <Link to="/batch" className="block">
          <div className="bg-white w-64 h-64 rounded-full shadow-lg flex flex-col justify-center items-center p-6 transition hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3a.75.75 0 011.5 0v3h1.5V3a.75.75 0 011.5 0v3h3a.75.75 0 010 1.5h-3v1.5h3a.75.75 0 010 1.5h-3v3a.75.75 0 01-1.5 0v-3h-1.5v3a.75.75 0 01-1.5 0v-3H6a.75.75 0 010-1.5h3V7.5H6a.75.75 0 010-1.5h3V3z" />
            </svg>
            <h2 className="text-lg font-bold text-gray-800">Procesos Batch</h2>
            <p className="text-sm text-gray-600 text-center">Administra generación masiva de documentos.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
