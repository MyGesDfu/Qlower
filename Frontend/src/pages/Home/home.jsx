import { useState, useEffect } from 'react'
import CreateTransactionForm from '../../components/CreateTransaction/CreateTransaction'
import TransactionList from '../../components/TransactionList/TransactionList'
import BalanceButton from '../../components/BalanceButton/BalanceButton'


const Home = () =>  {
  // Rendu de la page Home
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8000/app/transactions/")
          .then((res) => res.json())
          .then((data) => setTransactions(data));
  }, []);

  return (
    <main>
        <section>
            <CreateTransactionForm setTransactions={setTransactions} />
            <TransactionList transactions={transactions} />
            <BalanceButton />
        </section>
    </main>
  )
}

export default Home