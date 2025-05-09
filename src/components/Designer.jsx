import { useState } from 'react';
import ResizableTable from '../components/ResizableTable';
import ResizableTableHandler from '../components/ResizableTableHandler';

const Designer = () => {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);

  const addTable = () => {
    const id = Date.now();
    const newTable = {
      id,
      type: 'table',
      x: 100,
      y: 100,
      rows: [['Celda 1', 'Celda 2']],
      columns: 2,
      styles: { 0: { 0: {}, 1: {} } }
    };
    setElements([...elements, newTable]);
  };

  const handleDrag = (e, id) => {
    const updated = elements.map(el => {
      if (el.id === id) {
        return { ...el, x: e.clientX - 250, y: e.clientY - 80 };
      }
      return el;
    });
    setElements(updated);
  };

  const updateTable = (id, updatedData) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updatedData } : el));
  };

  return (
    <div className="flex h-screen">
      <div className="w-16 bg-white border-r p-2">
        <button onClick={addTable} className="w-full mb-2 bg-gray-100 py-1 px-2 rounded border hover:bg-gray-200 text-xs">
          ➕ Tabla
        </button>
      </div>

      <div className="flex-1 relative bg-[#fdf7e3] border-x">
        {elements.map(el => (
          <div
            key={el.id}
            onClick={() => setSelected(el.id)}
            style={{ position: 'absolute', left: el.x, top: el.y }}
            onDragEnd={(e) => handleDrag(e, el.id)}
            draggable
          >
            {el.type === 'table' && (
              <>
                <ResizableTable tableData={el} onUpdate={(data) => updateTable(el.id, data)} />
                {selected === el.id && (
                  <ResizableTableHandler
                    el={el}
                    selected={[{ row: 0, col: 0 }]} // simulación de celda seleccionada para que aparezcan handlers
                    setSelected={setSelected}
                    elements={elements}
                    setElements={setElements}
                    onDoubleClick={() => {}}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="w-64 bg-white p-3 border-l">
        <h2 className="font-semibold text-sm mb-3">Propiedades</h2>
        {!selected && <p className="text-gray-400 text-xs">Selecciona una tabla para editar.</p>}
        {selected && (
          <div className="text-xs">
            <p>Tabla seleccionada: #{selected}</p>
            <p className="mt-2 text-gray-500">Puedes redimensionar arrastrando desde los bordes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designer;
