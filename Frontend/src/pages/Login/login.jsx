import { useState } from "react";
import { loginUser } from "../../utilis/API"; 
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const loggedUser = await loginUser(userCredentials);
      if (loggedUser) {
        setSuccess(true);
        setError("");
        navigate("/");
      }
    } catch (error) {
        setError("Une erreur est survenue lors de la connexion.");
        console.error("Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {success && <p className="success-message">Connexion réussie !</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Se connecter</button>
      </form>
      <p>Vous n&apos;avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
    </div>
  );
};

export default Login;
