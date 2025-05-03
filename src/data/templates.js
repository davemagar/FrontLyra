
const templates = {
  estadoCuenta: [
    {
      type: "image",
      content: "https://via.placeholder.com/120x40?text=LOGO",
      x: 50,
      y: 30
    },
    {
      type: "text",
      content: "Estado de Cuenta",
      x: 200,
      y: 40,
      size: "large"
    },
    {
      type: "variable",
      content: "{{nombre_cliente}}",
      x: 50,
      y: 100,
      size: "medium"
    },
    {
      type: "text",
      content: "Periodo: {{periodo}}",
      x: 50,
      y: 130,
      size: "small"
    },
    {
      type: "table",
      x: 50,
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
      content: "Contrato de Prestación de Servicios",
      x: 50,
      y: 30,
      size: "large"
    },
    {
      type: "text",
      content: "Entre {{empresa}} y {{cliente}} se celebra el presente contrato bajo las siguientes condiciones:",
      x: 50,
      y: 90,
      size: "medium"
    },
    {
      type: "text",
      content: "Cláusula 1: El proveedor se compromete a...",
      x: 50,
      y: 140,
      size: "small"
    },
    {
      type: "text",
      content: "Cláusula 2: El cliente acepta que...",
      x: 50,
      y: 170,
      size: "small"
    },
    {
      type: "image",
      content: "https://via.placeholder.com/100x40?text=FIRMA",
      x: 300,
      y: 300
    }
  ],
  estadoCuentaTelefonico: [
    {
      type: "text",
      content: "Estado de Cuenta Telefónico",
      x: 50,
      y: 30,
      size: "large"
    },
    {
      type: "variable",
      content: "Línea: {{numero_telefono}}",
      x: 50,
      y: 80,
      size: "medium"
    },
    {
      type: "text",
      content: "Plan: {{nombre_plan}} | Ciclo: {{ciclo_facturacion}}",
      x: 50,
      y: 110,
      size: "small"
    },
    {
      type: "table",
      x: 50,
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
      type: "image",
      content: "https://via.placeholder.com/100x40?text=ASEGURADORA",
      x: 50,
      y: 20
    },
    {
      type: "text",
      content: "Póliza de Seguro",
      x: 200,
      y: 30,
      size: "large"
    },
    {
      type: "variable",
      content: "Asegurado: {{nombre_asegurado}}",
      x: 50,
      y: 90,
      size: "medium"
    },
    {
      type: "text",
      content: "Cobertura: {{tipo_cobertura}}",
      x: 50,
      y: 130,
      size: "small"
    },
    {
      type: "text",
      content: "Monto asegurado: ${{monto}}",
      x: 50,
      y: 160,
      size: "small"
    },
    {
      type: "text",
      content: "Vigencia: {{fecha_inicio}} a {{fecha_fin}}",
      x: 50,
      y: 190,
      size: "small"
    }
  ]
};

export default templates;
