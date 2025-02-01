const TransactionList = ({transactions}) => {
    return (
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
    );
  }

export default TransactionList;