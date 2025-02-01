import { useState, useEffect } from 'react'
import CreateTransactionForm from '../../components/CreateTransaction/CreateTransaction'
import TransactionList from '../../components/TransactionList/TransactionList'
import ListHeader from '../../components/ListHeader/ListHeader'
import { fetchTransactions } from '../../utilis/API'


const Home = () =>  {
  // Rendu de la page Home
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    getTransactions();
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
          <TransactionList transactions={transactions} setTransactions={setTransactions} />
        </section>
       </div>
    </main>
    
  )
}

export default Home