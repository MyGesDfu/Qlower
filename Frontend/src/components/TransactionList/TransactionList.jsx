import PropTypes from 'prop-types';

const TransactionList = ({transactions, setTransactions}) => {
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/app/transactions/${id}/`, {
      method: "DELETE",
    })
    .then(() => {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    })
    .catch((error) => console.error("Error deleting transaction:", error));
};
    return (
        <div className='table-container'>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Catégorie</th>
                    <th>Montant</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.categorie}</td>
                    <td>{transaction.montant}</td>
                    <td>
                      <button className="btn-tertiary" onClick={() => handleDelete(transaction.id)}>Supprimer</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
      </div>
    );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      categorie: PropTypes.string.isRequired,
      montant: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTransactions: PropTypes.func.isRequired,
};

export default TransactionList;