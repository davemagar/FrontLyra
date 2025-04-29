const AssistantButton = () => {
	return (
	  <button
		className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition text-2xl"
		title="Asistente Virtual"
		onClick={() => alert('Aquí aparecerá el asistente virtual')}
	  >
		💬
	  </button>
	);
  };
  
  export default AssistantButton;
  