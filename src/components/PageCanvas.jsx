import React from 'react';

const pageSizes = {
  A4: { width: '210mm', height: '297mm' },
  Carta: { width: '216mm', height: '279mm' },
  Legal: { width: '216mm', height: '356mm' },
};

const PageCanvas = ({ children, pageSize = 'A4' }) => {
  const styles = {
    page: {
      width: pageSizes[pageSize].width,
      height: pageSizes[pageSize].height,
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      margin: 'auto',
      position: 'relative',
      overflow: 'hidden',
    },
    wrapper: {
      backgroundColor: '#ccc',
      padding: '20px 0',
      minHeight: '100vh',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.page} className="page-wrapper">
        {children}
      </div>
    </div>
  );
};

export default PageCanvas;