import { Link } from 'react-router-dom'

const Error = () => {
  // Rendu de la page Error
  return (
    <div className="error">
      <h1 className="error__404">404</h1>
      <p className="error__404-txt">
        Oups! La page que vous demandez n&rsquo;existe pas
      </p>
      <Link className="error__404-link" to="/">
        Revenir sur la page d&rsquo;accueil
      </Link>
    </div>
  )
}

export default Error