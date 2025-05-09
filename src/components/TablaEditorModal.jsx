import { useState } from 'react';

const TablaEditorModal = ({ tableData, onSave, onClose }) => {
  const [localTable, setLocalTable] = useState(tableData);
  const [unit, setUnit] = useState('cm');
  const [selectedCells, setSelectedCells] = useState([{ row: 0, col: 0 }]);

  const isCellSelected = (row, col) =>
    selectedCells.some(cell => cell.row === row && cell.col === col);

  const toggleCellSelection = (row, col, ctrlKey) => {
    if (ctrlKey) {
      setSelectedCells(prev =>
        isCellSelected(row, col)
          ? prev.filter(cell => !(cell.row === row && cell.col === col))
          : [...prev, { row, col }]
      );
    } else {
      setSelectedCells([{ row, col }]);
    }
  };

  const handleChange = (rowIndex, colIndex, value) => {
    const updated = [...localTable.rows];
    updated[rowIndex][colIndex] = value;
    setLocalTable({ ...localTable, rows: updated });
  };

  const addRow = () => {
    const newRow = Array(localTable.rows[0].length).fill('');
    setLocalTable({ ...localTable, rows: [...localTable.rows, newRow] });
  };

  const addColumn = () => {
    const updated = localTable.rows.map(row => [...row, '']);
    setLocalTable({ ...localTable, rows: updated });
  };

  const getCurrentStyle = () => {
    if (selectedCells.length === 1) {
      const { row, col } = selectedCells[0];
      return localTable.styles?.[row]?.[col] || {};
    }
    return {};
  };

  const updateStyle = (property, value) => {
    const newStyles = { ...localTable.styles };
    selectedCells.forEach(({ row, col }) => {
      if (!newStyles[row]) newStyles[row] = {};
      if (!newStyles[row][col]) newStyles[row][col] = {};
      newStyles[row][col][property] = value;
    });
    setLocalTable({ ...localTable, styles: newStyles });
  };

  const handleResize = (dimension, value) => {
    let numericValue = parseFloat(value);
    if (unit === 'cm') numericValue *= 37.8;
    if (unit === 'in') numericValue *= 96;
    updateStyle(dimension, `${numericValue}px`);
  };

  const handleRowTypeChange = (type) => {
    selectedCells.forEach(({ row }) => {
      const updated = { ...localTable.rowTypes } || {};
      if (!updated[row]) updated[row] = {};
      updated[row].type = type;
      setLocalTable({ ...localTable, rowTypes: updated });
    });
  };

  const handleAlignChange = (alignType, value) => {
    selectedCells.forEach(({ row }) => {
      const updated = { ...localTable.rowTypes } || {};
      if (!updated[row]) updated[row] = {};
      updated[row][alignType] = value;
      setLocalTable({ ...localTable, rowTypes: updated });
    });
  };

  const handleColorChange = (color) => updateStyle('bgColor', color);
  const handleFontColorChange = (color) => updateStyle('fontColor', color);

  const currentStyle = getCurrentStyle();
  const currentRowType = localTable.rowTypes?.[selectedCells[0]?.row] || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow w-[90%] max-w-6xl flex gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4">Editor de Tabla</h2>
          <div className="mb-4">
            <span className="mr-4 font-semibold">Unidad:</span>
            <label><input type="radio" value="px" checked={unit === 'px'} onChange={() => setUnit('px')} /> Pixeles</label>
            <label className="ml-4"><input type="radio" value="cm" checked={unit === 'cm'} onChange={() => setUnit('cm')} /> Centímetros</label>
            <label className="ml-4"><input type="radio" value="in" checked={unit === 'in'} onChange={() => setUnit('in')} /> Pulgadas</label>
          </div>
          <table className="border border-gray-400 w-full mb-4 text-sm">
            <tbody>
              {localTable.rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, colIdx) => {
                    const style = localTable.styles?.[rowIdx]?.[colIdx] || {};
                    const isSelected = isCellSelected(rowIdx, colIdx);
                    return (
                      <td
                        key={colIdx}
                        className={`border p-1 align-top ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
                        onClick={(e) => toggleCellSelection(rowIdx, colIdx, e.ctrlKey)}
                        style={{ backgroundColor: style.bgColor || 'transparent' }}
                      >
                        <textarea
                          value={cell}
                          onChange={(e) => handleChange(rowIdx, colIdx, e.target.value)}
                          className="w-full h-20 resize-none border rounded p-1 bg-white"
                          style={{
                            fontFamily: style.fontFamily || 'inherit',
                            fontSize: style.fontSize || 'inherit',
                            fontWeight: style.fontWeight || 'normal',
                            fontStyle: style.fontStyle || 'normal',
                            textDecoration: style.textDecoration || 'none',
                            color: style.fontColor || 'inherit'
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-3">
            <button onClick={addRow} className="px-3 py-1 bg-green-500 text-white rounded">Agregar Fila</button>
            <button onClick={addColumn} className="px-3 py-1 bg-blue-500 text-white rounded">Agregar Columna</button>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
            <button onClick={() => onSave(localTable)} className="px-4 py-2 bg-yellow-500 text-white rounded">Guardar</button>
          </div>
        </div>

        <div className="w-64 border-l pl-4 text-sm">
          <h3 className="font-semibold mb-2">Celdas seleccionadas</h3>
          <div className="mb-3">
            <label className="block mb-1">Tipo de fila</label>
            <select value={currentRowType.type || 'standard'} onChange={(e) => handleRowTypeChange(e.target.value)} className="w-full border p-1">
              <option value="standard">Estándar</option>
              <option value="header">Encabezado</option>
              <option value="footer">Pie</option>
              <option value="repetitive">Repetitiva</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Fuente</label>
            <select value={currentStyle.fontFamily || ''} onChange={(e) => updateStyle('fontFamily', e.target.value)} className="w-full border p-1">
              <option value="">Por defecto</option>
              <option value="Arial">Arial</option>
              <option value="Roboto">Roboto</option>
              <option value="Courier New">Courier New</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Tamaño de texto (px)</label>
            <input type="number" value={parseInt(currentStyle.fontSize) || ''} onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)} className="w-full border p-1" />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Color de texto</label>
            <input type="color" value={currentStyle.fontColor || '#000000'} onChange={(e) => handleFontColorChange(e.target.value)} className="w-full h-8" />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Color de fondo</label>
            <input type="color" value={currentStyle.bgColor || '#ffffff'} onChange={(e) => handleColorChange(e.target.value)} className="w-full h-8" />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Estilos de texto</label>
            <label className="flex items-center mb-1">
              <input type="checkbox" checked={currentStyle.fontWeight === 'bold'} onChange={(e) => updateStyle('fontWeight', e.target.checked ? 'bold' : 'normal')} className="mr-2" />
              Negrita
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" checked={currentStyle.fontStyle === 'italic'} onChange={(e) => updateStyle('fontStyle', e.target.checked ? 'italic' : 'normal')} className="mr-2" />
              Cursiva
            </label>
            <label className="flex items-center mb-1">
              <input type="checkbox" checked={currentStyle.textDecoration === 'underline'} onChange={(e) => updateStyle('textDecoration', e.target.checked ? 'underline' : 'none')} className="mr-2" />
              Subrayado
            </label>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Alineación horizontal</label>
            <select value={currentRowType.hAlign || 'left'} onChange={(e) => handleAlignChange('hAlign', e.target.value)} className="w-full border p-1">
              <option value="left">Izquierda</option>
              <option value="center">Centro</option>
              <option value="right">Derecha</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Alineación vertical</label>
            <select value={currentRowType.vAlign || 'top'} onChange={(e) => handleAlignChange('vAlign', e.target.value)} className="w-full border p-1">
              <option value="top">Arriba</option>
              <option value="middle">Centro</option>
              <option value="bottom">Abajo</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Ancho ({unit})</label>
            <input type="number" placeholder="Ancho" onChange={(e) => handleResize('width', e.target.value)} className="w-full border p-1" />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Alto ({unit})</label>
            <input type="number" placeholder="Alto" onChange={(e) => handleResize('height', e.target.value)} className="w-full border p-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaEditorModal;