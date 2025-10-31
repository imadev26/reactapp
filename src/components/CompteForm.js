import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm({ onAdd }) {
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompte(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    axios.post(`${API_BASE_URL}/comptes`, compte)
      .then(response => {
        alert('Compte ajouté');
        setCompte({ solde: '', dateCreation: '', type: 'COURANT' });
        if (typeof onAdd === 'function') onAdd();
      })
      .catch(err => setError(err.response?.data?.message || err.message || 'Erreur'))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Solde</label>
          <input
            type="number"
            name="solde"
            className="form-control"
            value={compte.solde}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Date de Création</label>
          <input
            type="date"
            name="dateCreation"
            className="form-control"
            value={compte.dateCreation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Type</label>
          <select name="type" className="form-select" value={compte.type} onChange={handleChange}>
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Envoi...' : 'Ajouter'}</button>
      </form>
    </div>
  );
}

export default CompteForm;
