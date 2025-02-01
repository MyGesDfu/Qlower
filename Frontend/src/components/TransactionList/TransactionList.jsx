import PropTypes from 'prop-types';
import { deleteTransaction } from '../../utilis/API';

const TransactionList = ({ transactions, setTransactions }) => {
  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      alert("Erreur lors de la suppression de la transaction !")
      console.error("Error deleting transaction:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR"); 
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
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.categorie}</td>
              <td>{transaction.montant} €</td>
              <td>
                <button className="btn-tertiary" onClick={() => handleDelete(transaction.id)}>
                  Supprimer
                </button>
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
