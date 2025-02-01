import { useState } from "react";

const BalanceButton = () => {
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
      <div>
        <label>Année :</label>
        <input
          type="number"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          required
        />
        <button onClick={handleGenerate}>Générer la balance comptable</button>
      </div>
    );
}

export default BalanceButton;