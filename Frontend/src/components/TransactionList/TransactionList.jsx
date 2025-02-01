import PropTypes from 'prop-types';

const TransactionList = ({transactions}) => {
    return (
        <div className='table-container'>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Catégorie</th>
                    <th>Montant</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.categorie}</td>
                    <td>{transaction.montant}</td>
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
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      categorie: PropTypes.string.isRequired,
      montant: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionList;