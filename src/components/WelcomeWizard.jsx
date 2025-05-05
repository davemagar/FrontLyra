
const WelcomeWizard = ({ onSelect }) => {
  const opciones = [
    { label: "Insertar texto", icon: "🅣", value: "text" },
    { label: "Insertar variable", icon: "🔣", value: "variable" },
    { label: "Insertar imagen", icon: "🖼️", value: "image" },
    { label: "Insertar tabla", icon: "📊", value: "table" }
  ];

  const handleSelect = (type) => {
    onSelect(type);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-full text-gray-700">
      <div className="bg-white rounded-lg p-8 shadow-md border">
        <h2 className="text-xl font-bold mb-4">¿Qué deseas hacer hoy?</h2>
        <p className="mb-6 text-sm text-gray-500">Selecciona qué elementos deseas insertar en tu diseño.</p>
        <div className="grid grid-cols-2 gap-4">
          {opciones.map((op, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(op.value)}
              className="flex flex-col items-center justify-center bg-yellow-100 hover:bg-yellow-200 rounded-lg px-4 py-3 transition text-sm"
            >
              <span className="text-2xl mb-1">{op.icon}</span>
              {op.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeWizard;
