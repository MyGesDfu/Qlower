import { useState } from "react";

const CreateTransactionForm = () => {
    const [date, setDate] = useState("");
    const [categorie, setCategorie] = useState("Ventes");
    const [montant, setMontant] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = { date, categorie, montant };
        // Envoyer la requête POST pour enregistrer la transaction
        fetch("/api/transactions/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                <option value="Ventes">Ventes</option>
                <option value="Achats">Achats</option>
                <option value="Salaires">Salaires</option>
            </select>
            <input type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default CreateTransactionForm;