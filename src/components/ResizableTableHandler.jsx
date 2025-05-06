
import React from 'react';

const ResizableTableHandler = ({ el, selected, setSelected, elements, setElements, onDoubleClick }) => {
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
              updated.styles[rowIdx][colIdx].width = `${(parseInt(updated.styles[rowIdx][colIdx].width || 100) + dx)}px`;
            } else {
              updated.styles[rowIdx][colIdx].height = `${(parseInt(updated.styles[rowIdx][colIdx].height || 40) + dy)}px`;
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

  return (
    <div
      style={{ position: 'absolute', top: el.y, left: el.x, zIndex: selected === el.id ? 10 : 1 }}
      onClick={() => setSelected(el.id)}
      onDoubleClick={() => onDoubleClick(el.id)}
    >
      <table className="border border-black bg-white">
        <tbody>
          {el.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => {
                const style = el.styles?.[rowIdx]?.[colIdx] || {};
                const rowMeta = el.rowTypes?.[rowIdx] || {};
                return (
                  <td
                    key={colIdx}
                    className="border border-gray-300 relative group"
                    style={{
                      width: style.width || '100px',
                      height: style.height || '40px',
                      backgroundColor: style.bgColor || 'transparent',
                      textAlign: rowMeta.hAlign || 'left',
                      verticalAlign: rowMeta.vAlign || 'top',
                      fontFamily: style.fontFamily || 'inherit',
                      fontSize: style.fontSize || 'inherit',
                      fontWeight: style.fontWeight || 'normal',
                      fontStyle: style.fontStyle || 'normal',
                      textDecoration: style.textDecoration || 'none',
                      color: style.fontColor || 'inherit',
                      padding: '4px',
                      position: 'relative'
                    }}
                  >
                    {cell}
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
