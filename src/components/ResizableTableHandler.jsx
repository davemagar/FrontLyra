import React from 'react';

const MAX_WIDTH = 800;
const MAX_HEIGHT = 400;

const ResizableTableHandler = ({ el, selected, setSelected, elements, setElements, onDoubleClick }) => {
  const handleMouseDown = (e, rowIdx, colIdx, direction) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      requestAnimationFrame(() => {
        setElements(prev =>
          prev.map(item => {
            if (item.id !== el.id) return item;

            const updated = { ...item };
            updated.styles = updated.styles || {};
            updated.styles[rowIdx] = updated.styles[rowIdx] || {};
            updated.styles[rowIdx][colIdx] = updated.styles[rowIdx][colIdx] || {};

            const style = updated.styles[rowIdx][colIdx];

            const currentWidth = parseInt(style.width || 100);
            const currentHeight = parseInt(style.height || 40);

            if (direction === 'width') {
              const next = Math.min(MAX_WIDTH, Math.max(40, currentWidth + dx * 0.1));
              style.width = `${next}px`;
            } else if (direction === 'height') {
              const next = Math.min(MAX_HEIGHT, Math.max(20, currentHeight + dy * 0.1));
              style.height = `${next}px`;
            } else if (direction === 'left') {
              const next = Math.min(MAX_WIDTH, Math.max(40, currentWidth - dx * 0.1));
              style.width = `${next}px`;
            } else if (direction === 'top') {
              const next = Math.min(MAX_HEIGHT, Math.max(20, currentHeight - dy * 0.1));
              style.height = `${next}px`;
            }

            return updated;
          })
        );
      });
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
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'left')}
                      className="absolute top-0 left-0 w-1 h-full cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                    />
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'top')}
                      className="absolute top-0 left-0 h-1 w-full cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100"
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