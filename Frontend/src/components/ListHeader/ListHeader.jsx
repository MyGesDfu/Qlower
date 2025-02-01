import { useState } from "react";

const ListHeader = () => {
    const [annee, setAnnee] = useState("");
  
    const handleGenerate = () => {
      fetch(`http://localhost:8000/app/balance-comptable/${annee}/`)
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `balance_comptable_${annee}.csv`;
          a.click();
        });
    };
  
    return (
      <div className="list-header">
        <h2>Liste des Transactions</h2>
        <div className="export-section">
          <input
          type="number"
          placeholder="Entrez l'année"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          required
          />
          <button className="btn-secondary" onClick={handleGenerate}> 
            Exporter 
          </button>
        </div>
      </div>
    );
}

export default ListHeader;