
import templates from '../data/templates';

const WelcomeWizard = ({ onSelect, onTemplateSelect }) => {
  const opciones = [
    { label: "Insertar texto", icon: "🅣", value: "text" },
    { label: "Insertar variable", icon: "🔣", value: "variable" },
    { label: "Insertar imagen", icon: "🖼️", value: "image" },
    { label: "Insertar tabla", icon: "📊", value: "table" }
  ];

  const plantillas = [
    { label: "Estado de cuenta", icon: "🧾", value: "estadoCuenta" },
    { label: "Contrato de servicios", icon: "📃", value: "contratoServicios" },
    { label: "Estado de cuenta telefónico", icon: "📡", value: "estadoCuentaTelefonico" },
    { label: "Contrato de seguros", icon: "📄", value: "contratoSeguros" }
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center h-full text-gray-700">
      <div className="bg-white rounded-lg p-8 shadow-md border w-[500px]">
        <h2 className="text-xl font-bold mb-4">¿Qué deseas hacer hoy?</h2>
        <p className="mb-4 text-sm text-gray-500">Selecciona los elementos o plantillas para comenzar.</p>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2 text-left">🧩 Elementos individuales</h3>
          <div className="grid grid-cols-2 gap-4">
            {opciones.map((op, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(op.value)}
                className="flex flex-col items-center justify-center bg-yellow-100 hover:bg-yellow-200 rounded-lg px-4 py-3 transition text-sm"
              >
                <span className="text-2xl mb-1">{op.icon}</span>
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-left">📄 Plantillas precargadas</h3>
          <div className="grid grid-cols-2 gap-4">
            {plantillas.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => onTemplateSelect(templates[tpl.value])}
                className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-3 transition text-sm"
              >
                <span className="text-2xl mb-1">{tpl.icon}</span>
                {tpl.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeWizard;
