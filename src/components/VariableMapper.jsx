
import { useState } from 'react';

const VariableMapperModal = ({ onVariablesMapped }) => {
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [variables, setVariables] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const extractPaths = (obj, path = '') => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullPath = path ? `${path}.${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return extractPaths(value, fullPath);
      } else if (Array.isArray(value)) {
        return [`${fullPath}[]`, ...extractPaths(value[0] || {}, `${fullPath}[]`)];
      } else {
        return [fullPath];
      }
    });
  };

  const xmlToJson = (node) => {
    const obj = {};
    if (node.nodeType === 1 && node.attributes.length > 0) {
      Array.from(node.attributes).forEach(attr => {
        obj[attr.name] = attr.value;
      });
    }
    if (node.hasChildNodes()) {
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === 1) {
          const name = child.nodeName;
          if (!obj[name]) {
            obj[name] = xmlToJson(child);
          } else {
            if (!Array.isArray(obj[name])) {
              obj[name] = [obj[name]];
            }
            obj[name].push(xmlToJson(child));
          }
        } else if (child.nodeType === 3 && child.nodeValue.trim()) {
          obj['value'] = child.nodeValue.trim();
        }
      });
    }
    return obj;
  };

  const parseFile = (text, ext) => {
    let vars = [];
    if (ext === 'json') {
      try {
        const data = JSON.parse(text);
        vars = extractPaths(data);
      } catch {
        alert("JSON inválido.");
      }
    } else if (ext === 'csv') {
      const delimiter = text.includes('|') ? '|' : ',';
      const lines = text.split(/\r?\n/).filter(Boolean);
      vars = lines[0].split(delimiter);
    } else if (ext === 'xml') {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "application/xml");
      const obj = xmlToJson(xmlDoc);
      vars = extractPaths(obj);
    } else {
      alert('Formato no soportado.');
    }
    setVariables(vars);
    onVariablesMapped && onVariablesMapped(vars);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const ext = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    reader.onload = () => {
      parseFile(reader.result, ext);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-4 right-4 bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-3 px-4 rounded-full shadow-lg z-50"
      >
        📥
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Cargar archivo de entrada</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <input type="file" accept=".json,.csv,.xml" onChange={handleFileUpload} className="mb-4" />
            {fileName && <p className="text-sm mb-2">📄 {fileName}</p>}
            <ul className="max-h-40 overflow-y-auto text-sm border p-2 rounded">
              {variables.map((v, i) => (
                <li key={i} className="mb-1 text-gray-700">- {`{{${v}}}`}</li>
              ))}
            </ul>
            <button onClick={closeModal} className="mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-white font-semibold py-2 rounded">
              Usar estas variables
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VariableMapperModal;
