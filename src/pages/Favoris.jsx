import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import CarteAnnonce from "../components/CarteAnnonce";

function Favoris() {
  const { favoris } = useContext(AppContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mes favoris ❤️</h1>

      {favoris.length === 0 ? (
        <p>Tu n’as encore rien ajouté en favoris…</p>
      ) : (
        <div className="liste-annonces">
          {favoris.map((annonce) => (
            <CarteAnnonce key={annonce.id} annonce={annonce} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoris;