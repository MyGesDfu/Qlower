import CreateTransactionForm from '../../components/CreateTransaction/CreateTransaction'


function Home() {
  // Rendu de la page Home
  return (
    <main>
        <h1>Transactions</h1>
        <CreateTransactionForm />
    </main>
  )
}

export default Home