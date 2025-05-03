
import { useState } from 'react';
import WelcomeWizard from '../components/WelcomeWizard';
import TablaEditorModal from '../components/TablaEditorModal';
import templates from '../data/templates';

const Designer = () => {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showWizard, setShowWizard] = useState(true);
  const [showTableEditor, setShowTableEditor] = useState(false);
  const [tableEditId, setTableEditId] = useState(null);

  const addElement = (type, content = '') => {
    const id = Date.now();
    const newElement = {
      id,
      type,
      content:
        type === 'image'
          ? ''
          : type === 'text'
          ? 'Texto editable'
          : type === 'variable'
          ? content || '{{variable}}'
          : type === 'table'
          ? {
              rows: [['Celda 1']],
              type: 'estandar',
            }
          : '',
      x: 150,
      y: 150,
      size: 'medium',
    };
    setElements((prev) => [...prev, newElement]);
  };

  const handleDrag = (e, id) => {
    const updated = elements.map((el) => {
      if (el.id === id) {
        return { ...el, x: e.clientX - 250, y: e.clientY - 80 };
      }
      return el;
    });
    setElements(updated);
  };

  const updateContent = (value) => {
    setElements((prev) =>
      prev.map((el) => (el.id === selected ? { ...el, content: value } : el))
    );
  };

  const updateSize = (value) => {
    setElements((prev) =>
      prev.map((el) => (el.id === selected ? { ...el, size: value } : el))
    );
  };

  const handleWizardSelection = (type) => {
    addElement(type);
    setShowWizard(false);
  };

  const handleTemplateSelect = (template) => {
    setElements(template);
    setShowWizard(false);
  };

  const handleTableDoubleClick = (id) => {
    setTableEditId(id);
    setShowTableEditor(true);
  };

  const saveTableChanges = (id, newContent) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, content: newContent } : el))
    );
    setShowTableEditor(false);
    setTableEditId(null);
  };

  return (
    <div className="flex h-screen">
      {showWizard && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-95 flex justify-center items-center">
          <WelcomeWizard
            onSelect={handleWizardSelection}
            onTemplateSelect={handleTemplateSelect}
          />
        </div>
      )}

      {showTableEditor && (
        <TablaEditorModal
          table={elements.find((el) => el.id === tableEditId)?.content}
          onSave={(newTable) => saveTableChanges(tableEditId, newTable)}
          onClose={() => setShowTableEditor(false)}
        />
      )}

      {/* Compact Toolbar */}
      <div className="w-14 bg-white border-r flex flex-col items-center py-4 space-y-4 shadow-sm">
        <button
          onClick={() => addElement('text')}
          title="Agregar texto"
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-lg"
        >
          🅣
        </button>
        <button
          onClick={() => addElement('variable')}
          title="Agregar variable"
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-lg"
        >
          🔣
        </button>
        <button
          onClick={() => addElement('image')}
          title="Agregar imagen"
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-lg"
        >
          🖼️
        </button>
        <button
          onClick={() => addElement('table')}
          title="Agregar tabla"
          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-lg"
        >
          📊
        </button>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative bg-[#fdf7e3] border-x"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const variable = e.dataTransfer.getData('text/plain');
          if (variable) {
            addElement('variable', `{{${variable}}}`);
          }
        }}
      >
        {elements.map((el) => (
          <div
            key={el.id}
            onClick={() => setSelected(el.id)}
            onDoubleClick={() => el.type === 'table' && handleTableDoubleClick(el.id)}
            style={{
              position: 'absolute',
              left: el.x,
              top: el.y,
              cursor: 'move',
              fontSize:
                el.size === 'small'
                  ? '12px'
                  : el.size === 'large'
                  ? '24px'
                  : '16px',
              border: selected === el.id ? '1px dashed #000' : 'none',
              padding: '4px',
              backgroundColor: el.type !== 'image' ? 'transparent' : 'none',
            }}
            draggable
            onDragEnd={(e) => handleDrag(e, el.id)}
            contentEditable={el.type !== 'image' && el.type !== 'table'}
            suppressContentEditableWarning
            onBlur={(e) => updateContent(e.target.innerText)}
          >
            {el.type === 'image' ? (
              <img
                src={el.content || 'https://via.placeholder.com/100'}
                className="w-24 h-auto"
                alt="img"
              />
            ) : el.type === 'table' ? (
              <table className="border border-black bg-white">
                <tbody>
                  {el.content.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-black px-2 py-1 text-sm"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              el.content
            )}
          </div>
        ))}
      </div>

      {/* Property Panel */}
      <div className="w-72 p-4 bg-white shadow-sm text-sm text-gray-700">
        <h2 className="font-semibold text-base mb-3">Propiedades</h2>
        {selected && (
          <>
            <div className="mb-3">
              <label className="block mb-1">Contenido</label>
              <input
                type="text"
                value={elements.find((el) => el.id === selected)?.content || ''}
                onChange={(e) => updateContent(e.target.value)}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </div>
            {elements.find((el) => el.id === selected)?.type !== 'image' &&
              elements.find((el) => el.id === selected)?.type !== 'table' && (
                <div className="mb-3">
                  <label className="block mb-1">Tamaño</label>
                  <select
                    value={elements.find((el) => el.id === selected)?.size}
                    onChange={(e) => updateSize(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                  >
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              )}
            {elements.find((el) => el.id === selected)?.type === 'image' && (
              <div className="mb-3">
                <label className="block mb-1">URL de imagen</label>
                <input
                  type="text"
                  value={elements.find((el) => el.id === selected)?.content || ''}
                  onChange={(e) => updateContent(e.target.value)}
                  className="w-full border px-2 py-1 rounded text-sm"
                />
              </div>
            )}
          </>
        )}
        {!selected && (
          <p className="text-gray-400">Selecciona un elemento para editar.</p>
        )}
      </div>
    </div>
  );
};

export default Designer;
