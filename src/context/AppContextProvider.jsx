// src/context/AppContext.jsx
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  // --- États globaux ---
  const [annonces, setAnnonces] = useState([]);      
  const [favoris, setFavoris] = useState([]);        
  const [filtres, setFiltres] = useState({});        
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/annonces") 
      .then((res) => setAnnonces(res.data))
      .catch((err) => console.error("Erreur de chargement des annonces :", err));
  }, []);

  const toggleFavori = (annonce) => {
    const dejaFavori = favoris.find((f) => f.id === annonce.id);
    if (dejaFavori) {
      setFavoris(favoris.filter((f) => f.id !== annonce.id));
    } else {
      setFavoris([...favoris, annonce]);
    }
  };

  const annoncesFiltrees = useMemo(() => {
    return annonces.filter((a) => {
      if (filtres.type && a.type !== filtres.type) return false;
      if (filtres.ville && !a.ville.toLowerCase().includes(filtres.ville.toLowerCase())) return false;
      return true;
    });
  }, [annonces, filtres]);

  const contextValue = {
    annonces,
    annoncesFiltrees,
    favoris,
    filtres,
    utilisateur,
    setAnnonces,
    setFiltres,
    setUtilisateur,
    toggleFavori,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;