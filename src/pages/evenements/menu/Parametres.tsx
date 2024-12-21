const Parametres = () => {
  return (
    <div>
      <h1>Paramètres de l'Utilisateur</h1>
      <form>
        <label>Nom: </label>
        <input type="text" />
        <br />
        <label>Email: </label>
        <input type="email" />
        <br />
        <label>Téléphone: </label>
        <input type="tel" />
        <br />
        <button>Enregistrer</button>
      </form>
    </div>
  );
};

export default Parametres;
