
import React, { useState, useEffect } from 'react';

const TablaEditorModal = ({ selectedTable, onClose, onSave }) => {
  const [type, setType] = useState('standard');
  const [rows, setRows] = useState([]);
  const [cellStyles, setCellStyles] = useState({});

  useEffect(() => {
    if (selectedTable) {
      setType(selectedTable.tableType || 'standard');
      setRows(selectedTable.rows || [['']]);
      setCellStyles(selectedTable.cellStyles || {});
    }
  }, [selectedTable]);

  const addRow = () => {
    const newRow = Array(rows[0]?.length || 1).fill('');
    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    setRows(rows.map(row => [...row, '']));
  };

  const updateCell = (r, c, value) => {
    const updated = [...rows];
    updated[r][c] = value;
    setRows(updated);
  };

  const updateStyle = (r, c, key, value) => {
    const keyId = `${r}-${c}`;
    setCellStyles({
      ...cellStyles,
      [keyId]: {
        ...cellStyles[keyId],
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    onSave({
      ...selectedTable,
      tableType: type,
      rows,
      cellStyles,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-4xl max-h-[90%] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Editar tabla</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Tipo de tabla</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="border px-3 py-1 rounded w-full">
            <option value="standard">Estándar</option>
            <option value="repetitive">Repetitiva</option>
            <option value="header">Encabezado</option>
            <option value="footer">Pie de página</option>
          </select>
        </div>

        <table className="table-auto border w-full mb-4">
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => {
                  const styles = cellStyles[`${r}-${c}`] || {};
                  return (
                    <td key={c} className="border p-2 align-top">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(r, c, e.target.value)}
                        className="border w-full mb-1 px-2 py-1 text-sm"
                      />
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                        <select value={styles.textAlign || 'left'} onChange={(e) => updateStyle(r, c, 'textAlign', e.target.value)} className="border px-1 py-1 rounded">
                          <option value="left">Izq</option>
                          <option value="center">Centro</option>
                          <option value="right">Der</option>
                        </select>
                        <select value={styles.verticalAlign || 'top'} onChange={(e) => updateStyle(r, c, 'verticalAlign', e.target.value)} className="border px-1 py-1 rounded">
                          <option value="top">Arriba</option>
                          <option value="middle">Medio</option>
                          <option value="bottom">Abajo</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Ancho"
                          value={styles.width || ''}
                          onChange={(e) => updateStyle(r, c, 'width', e.target.value)}
                          className="col-span-1 border px-1 py-1 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Alto"
                          value={styles.height || ''}
                          onChange={(e) => updateStyle(r, c, 'height', e.target.value)}
                          className="col-span-1 border px-1 py-1 rounded"
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-3 mb-4">
          <button onClick={addRow} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">+ Fila</button>
          <button onClick={addColumn} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">+ Columna</button>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
          <button onClick={handleSave} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default TablaEditorModal;
