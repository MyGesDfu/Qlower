import { useState } from "react";
import PropTypes from "prop-types";

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
        <div>
            <h2>Nouvelle Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="select select--multiple">
                    <select id="multi-select" value={categorie} onChange={(e) => setCategorie(e.target.value)} multiple>
                        <option value="Ventes">Ventes</option>
                        <option value="Achats">Achats</option>
                        <option value="Salaires">Salaires</option>
                    </select>
                    <span className="focus"></span>
                </div>
                <div className="form-group">
                    <input placeholder="Ajoutez le montant de la transaction"type="number" value={montant} onChange={(e) => setMontant(e.target.value)} required />
                </div>
                <button className="btn-primary" type="submit">Ajouter la transaction</button>
            </form>
        </div>
    );
};

CreateTransactionForm.propTypes = {
    setTransactions: PropTypes.func.isRequired,
};

export default CreateTransactionForm;
