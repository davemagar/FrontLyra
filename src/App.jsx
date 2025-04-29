import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import BatchWorker from './pages/BatchWorker';
import OnDemand from './pages/OnDemand';
import AssistantButton from './components/AssistantButton';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batch" element={<BatchWorker />} />
        <Route path="/ondemand" element={<OnDemand />} />
      </Routes>
      <AssistantButton />
    </MainLayout>
  );
}

export default App;
