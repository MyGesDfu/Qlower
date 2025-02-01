import { useState } from "react";

const CreateTransactionForm = ({ setTransactions }) => {
    const [date, setDate] = useState("");
    const [categorie, setCategorie] = useState("Ventes");
    const [montant, setMontant] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = { date, categorie, montant };

        fetch("http://localhost:8000/app/transactions/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
        })
        .then((res) => res.json())
        .then((data) => {
            setTransactions((prevTransactions) => [...prevTransactions, data]); // Ajoute la nouvelle transaction
        })
        .catch((error) => console.error("Error:", error));
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
            <button type="submit">Ajouter la transaction</button>
        </form>
    );
};

export default CreateTransactionForm;
