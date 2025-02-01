const API_URL = "http://localhost:8000/app";

export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${API_URL}/transactions/`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des transactions");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
};

export const createTransaction = async (transaction) => {
  try {
    const response = await fetch(`${API_URL}/transactions/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de la transaction");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await fetch(`${API_URL}/transactions/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la transaction");
    }
  } catch (error) {
    console.error("Erreur API:", error);
  }
};

export const fetchBalanceComptable = async (annee) => {
  return await fetch(`${API_URL}/balance-comptable/${annee}/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Erreur lors de la génération du fichier');
      }
      return res.blob();
    })
    .catch((error) => {
      console.error('Erreur:', error);
      throw error; 
    });
};

// Récupérer les utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users/`); 
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return [];
  }
};

// Créer un utilisateur
export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
};

// Connexion de l'utilisateur
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
};