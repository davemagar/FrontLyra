import React from 'react';

const ResizableTableHandler = ({ el, selected, setSelected, elements, setElements, onDoubleClick }) => {
  const handleMouseDown = (e, rowIdx, colIdx, direction) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const item = elements.find(item => item.id === el.id);
    const style = item.styles?.[rowIdx]?.[colIdx] || {};
    const initialWidth = parseInt(style.width || 100);
    const initialHeight = parseInt(style.height || 40);
    const initialX = item.x;
    const initialY = item.y;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setElements(prev =>
        prev.map(item => {
          if (item.id !== el.id) return item;

          const updated = { ...item };
          updated.styles = updated.styles || {};
          updated.styles[rowIdx] = updated.styles[rowIdx] || {};
          updated.styles[rowIdx][colIdx] = updated.styles[rowIdx][colIdx] || {};

          if (direction === 'width-right') {
            updated.styles[rowIdx][colIdx].width = `${Math.max(40, initialWidth + dx)}px`;
          }

          if (direction === 'width-left') {
            updated.styles[rowIdx][colIdx].width = `${Math.max(40, initialWidth - dx)}px`;
            updated.x = Math.max(0, initialX + dx);
          }

          if (direction === 'height-bottom') {
            updated.styles[rowIdx][colIdx].height = `${Math.max(20, initialHeight + dy)}px`;
          }

          if (direction === 'height-top') {
            updated.styles[rowIdx][colIdx].height = `${Math.max(20, initialHeight - dy)}px`;
            updated.y = Math.max(0, initialY + dy);
          }

          return updated;
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

  const handleCellClick = (e, rowIdx, colIdx) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      setSelected(prev => {
        const exists = prev?.some(sel => sel.row === rowIdx && sel.col === colIdx);
        if (exists) {
          return prev.filter(sel => !(sel.row === rowIdx && sel.col === colIdx));
        } else {
          return [...(prev || []), { row: rowIdx, col: colIdx }];
        }
      });
    } else {
      setSelected([{ row: rowIdx, col: colIdx }]);
    }
  };

  const isSelected = (rowIdx, colIdx) =>
    selected?.some(sel => sel.row === rowIdx && sel.col === colIdx);

  return (
    <div
      style={{ position: 'absolute', top: el.y, left: el.x, zIndex: 10 }}
      onClick={() => setSelected([])} onDoubleClick={() => onDoubleClick(el.id)}
    >
      <table className="border border-black bg-white">
        <tbody>
          {el.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => {
                const style = el.styles?.[rowIdx]?.[colIdx] || {};
                const rowMeta = el.rowTypes?.[rowIdx] || {};
                const selectedClass = isSelected(rowIdx, colIdx)
                  ? 'ring ring-yellow-400'
                  : '';

                return (
                  <td
                    key={colIdx}
                    onClick={(e) => handleCellClick(e, rowIdx, colIdx)}
                    className={`border border-gray-300 relative group ${selectedClass}`}
                    style={{
                      width: style.width || '100px',
                      height: style.height || '40px',
                      backgroundColor: style.bgColor || 'transparent',
                      color: style.fontColor || 'inherit',
                      textAlign: rowMeta.hAlign || style.hAlign || 'left',
                      verticalAlign: rowMeta.vAlign || style.vAlign || 'top',
                      fontFamily: style.fontFamily || 'inherit',
                      fontSize: style.fontSize || 'inherit',
                      fontWeight: style.fontWeight || 'normal',
                      fontStyle: style.fontStyle || 'normal',
                      textDecoration: style.textDecoration || 'none',
                      padding: '4px',
                      position: 'relative'
                    }}
                  >
                    {cell}
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'width-right')}
                      className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                    />
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'width-left')}
                      className="absolute top-0 left-0 w-1 h-full cursor-col-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                    />
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'height-bottom')}
                      className="absolute bottom-0 left-0 h-1 w-full cursor-row-resize bg-blue-500 opacity-0 group-hover:opacity-100"
                    />
                    <div
                      onMouseDown={(e) => handleMouseDown(e, rowIdx, colIdx, 'height-top')}
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