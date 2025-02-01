import { useState, useEffect } from 'react'
import CreateTransactionForm from '../../components/CreateTransaction/CreateTransaction'
import TransactionList from '../../components/TransactionList/TransactionList'
import ListHeader from '../../components/ListHeader/ListHeader'


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
      <div className='container'>
        <header>
            <h1>Gestion Comptable</h1>
        </header>

        <section className='transaction-form'>
            <CreateTransactionForm className='transaction-form' setTransactions={setTransactions} />
        </section>
        <section className='transaction-list'>
          <ListHeader />
          <TransactionList transactions={transactions} />
        </section>
       </div>
    </main>
    
  )
}

export default Home