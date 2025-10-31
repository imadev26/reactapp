import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList({ refreshKey = 0 }) {
  const [comptes, setComptes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${API_BASE_URL}/comptes`)
      .then(response => setComptes(response.data || []))
      .catch(err => setError(err.message || 'Erreur lors de la récupération'))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>
      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Solde</th>
              <th>Date de Création</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {comptes.length === 0 && (
              <tr><td colSpan="4">Aucun compte trouvé.</td></tr>
            )}
            {comptes.map(compte => (
              <tr key={compte.id}>
                <td>{compte.id}</td>
                <td>{compte.solde}</td>
                <td>{compte.dateCreation}</td>
                <td>{compte.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CompteList;
