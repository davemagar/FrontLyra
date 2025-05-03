import { useState, useEffect } from 'react';

const TablaEditorModal = ({ table, onSave, onClose }) => {
  const [type, setType] = useState('standard');
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (table) {
      setType(table.tableType || 'standard');
      setRows(table.rows || [['']]);
      setColumns(table.columns || ['Columna 1']);
    }
  }, [table]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    const newRow = new Array(columns.length).fill('');
    setRows([...rows, newRow]);
  };

  const handleAddColumn = () => {
    const newColumns = [...columns, `Columna ${columns.length + 1}`];
    setColumns(newColumns);
    const newRows = rows.map(row => [...row, '']);
    setRows(newRows);
  };

  const handleSave = () => {
    onSave({
      ...table,
      tableType: type,
      rows,
      columns
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Editar Tabla</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Tipo de tabla</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="standard">Estándar</option>
            <option value="repetitive">Repetitiva</option>
            <option value="header">Encabezado</option>
            <option value="footer">Pie de página</option>
          </select>
        </div>

        <div className="overflow-auto mb-4">
          <table className="w-full border text-sm">
            <thead>
              <tr>
                {columns.map((col, colIndex) => (
                  <th key={colIndex} className="border px-2 py-1 bg-gray-100">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border px-2 py-1">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        className="w-full border px-1 py-0.5 rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 mb-4">
          <button onClick={handleAddRow} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Agregar fila</button>
          <button onClick={handleAddColumn} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Agregar columna</button>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default TablaEditorModal;
