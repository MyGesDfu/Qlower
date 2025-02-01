import { useState } from "react";
import { fetchBalanceComptable } from "../../utilis/API";

const ListHeader = () => {
    const [annee, setAnnee] = useState("");
  
    const handleGenerate = () => {
      fetchBalanceComptable(annee)
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `balance_comptable_${annee}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          alert("Une erreur est survenue lors du téléchargement du fichier.")
          console.error("Error deleting transaction:", error);
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