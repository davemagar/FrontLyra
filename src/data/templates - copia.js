
// Lista de plantillas precargadas para el diseñador de Lyra CCM

const templates = {
  estadoCuenta: [
    {
      type: "text",
      content: "Estado de Cuenta",
      x: 100,
      y: 40,
      size: "large"
    },
    {
      type: "variable",
      content: "{{nombre_cliente}}",
      x: 100,
      y: 100,
      size: "medium"
    },
    {
      type: "text",
      content: "Periodo: {{periodo}}",
      x: 100,
      y: 130,
      size: "small"
    },
    {
      type: "table",
      x: 100,
      y: 180,
      columns: ["Fecha", "Descripción", "Monto"],
      data: [
        { "Fecha": "01/04/2025", "Descripción": "Compra tienda", "Monto": "$400.00" },
        { "Fecha": "05/04/2025", "Descripción": "Abono", "Monto": "$-200.00" }
      ],
      tipo: "repetitiva"
    }
  ],
  contratoServicios: [
    {
      type: "text",
      content: "Contrato de Servicios",
      x: 100,
      y: 40,
      size: "large"
    },
    {
      type: "text",
      content: "Entre {{empresa}} y {{cliente}}, se acuerda lo siguiente:",
      x: 100,
      y: 100,
      size: "medium"
    },
    {
      type: "text",
      content: "Cláusula 1: Objeto del contrato...",
      x: 100,
      y: 140,
      size: "small"
    }
  ],
  estadoCuentaTelefonico: [
    {
      type: "text",
      content: "Resumen de Servicios Telefónicos",
      x: 100,
      y: 40,
      size: "large"
    },
    {
      type: "variable",
      content: "{{numero_telefono}}",
      x: 100,
      y: 100,
      size: "medium"
    },
    {
      type: "table",
      x: 100,
      y: 160,
      columns: ["Fecha", "Minutos", "Costo"],
      data: [
        { "Fecha": "03/04/2025", "Minutos": "45", "Costo": "$25.00" },
        { "Fecha": "10/04/2025", "Minutos": "15", "Costo": "$10.00" }
      ],
      tipo: "repetitiva"
    }
  ],
  contratoSeguros: [
    {
      type: "text",
      content: "Póliza de Seguro",
      x: 100,
      y: 40,
      size: "large"
    },
    {
      type: "variable",
      content: "{{nombre_asegurado}}",
      x: 100,
      y: 100,
      size: "medium"
    },
    {
      type: "text",
      content: "Cobertura: {{cobertura}}",
      x: 100,
      y: 140,
      size: "small"
    },
    {
      type: "text",
      content: "Monto asegurado: {{monto}}",
      x: 100,
      y: 170,
      size: "small"
    }
  ]
};

export default templates;
