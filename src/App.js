import React, { useState } from 'react';
import CompteForm from './components/CompteForm';
import CompteList from './components/CompteList';

function App() {
  // refreshKey increments to tell CompteList to refetch
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = () => setRefreshKey(k => k + 1);

  return (
    <div>
      <CompteForm onAdd={handleAdded} />
      <CompteList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
