
import React from 'react';

const ResizableTableHandler = ({ el, selected, setSelected, elements, setElements, onDoubleClickEdit }) => {
  const handleMouseDown = (e, rowIdx, colIdx, direction) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setElements(prev =>
        prev.map(item => {
          if (item.id === el.id) {
            const updated = { ...item };
            updated.styles = updated.styles || {};
            updated.styles[rowIdx] = updated.styles[rowIdx] || {};
            updated.styles[rowIdx][colIdx] = updated.styles[rowIdx][colIdx] || {};

            if (direction === 'width') {
              updated.styles[rowIdx][colIdx].width = `${parseInt(updated.styles[rowIdx][colIdx].width || 100) + dx}px`;
            } else {
              updated.styles[rowIdx][colIdx].height = `${parseInt(updated.styles[rowIdx][colIdx].height || 40) + dy}px`;
            }

            return updated;
          }
          return item;
        })
      );
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleContentChange = (rowIdx, colIdx, value) => {
    setElements(prev =>
      prev.map(item => {
        if (item.id === el.id) {
          const updated = { ...item };
          updated.rows[rowIdx][colIdx] = value;
          return updated;
        }
        return item;
      })
    );
  };

  const tableData = el;

  return (
    <div
      style={{ position: 'absolute', top: el.y, left: el.x, zIndex: selected === el.id ? 10 : 1 }}
      onClick={() => setSelected(el.id)}
      onDoubleClick={() => onDoubleClickEdit && onDoubleClickEdit(el.id)}
    >
      <table className="border border-black bg-white text-sm">
        <tbody>
          {tableData.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => {
                const style = tableData.styles?.[rowIdx]?.[colIdx] || {};
                const rowMeta = tableData.rowTypes?.[rowIdx] || {};
                const height = style.height || '40px';
                const width = style.width || '100px';

                return (
                  <td
                    key={colIdx}
                    className="border border-gray-300 relative group"
                    style={{
                      width,
                      height,
                      padding: 0,
                      position: 'relative',
                      boxSizing: 'border-box',
                      backgroundColor: style.bgColor || 'transparent'
                    }}
                  >
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleContentChange(rowIdx, colIdx, e.target.innerText)}
                      className="w-full h-full px-2"
                      style={{
                        display: 'flex',
                        justifyContent:
                          rowMeta.hAlign === 'center'
                            ? 'center'
                            : rowMeta.hAlign === 'right'
                            ? 'flex-end'
                            : 'flex-start',
                        alignItems:
                          rowMeta.vAlign === 'middle'
                            ? 'center'
                            : rowMeta.vAlign === 'bottom'
                            ? 'flex-end'
                            : 'flex-start',
                        textAlign: rowMeta.hAlign || 'left',
                        height: '100%'
                      }}
                    >
                      {cell}
                    </div>
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'width')}
                      className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                    />
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'height')}
                      className="absolute bottom-0 left-0 h-1 w-full cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTableHandler;
