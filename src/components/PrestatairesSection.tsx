import React, { useState } from 'react';
import { iconsListe } from '../lib/iconsListe';
import { Link } from 'react-router-dom';

interface IPrestataire {
  id: string;
  nom: string;
  type: 1 | 2 | 3 | 4; // 1 = Traiteur, 2 = DJ, 3 = Décorateur, 4 = Autre
  localisation: string;
  gammePrix: string;
  note: 1 | 2 | 3 | 4 | 5;
  telephone: string;
  email: string;
}

interface PrestatairesProps {
  prestatairesInitiales: IPrestataire[];
}

const PrestatairesSection: React.FC<PrestatairesProps> = ({
  prestatairesInitiales = [],
}) => {
  const [prestataires] = useState<IPrestataire[]>(prestatairesInitiales);

  // États pour la recherche et les filtres
  const [recherche, setRecherche] = useState<string>('');
  const [filtreType, setFiltreType] = useState<string>('');
  const [filtreNote, setFiltreNote] = useState<string>('');
  const [trierPar, setTrierPar] = useState<string>('nom'); // Critère de tri (nom, note, localisation)
  const [ordreCroissant, setOrdreCroissant] = useState<boolean>(true); // Détermine si le tri est croissant ou décroissant

  const [contactOptionsVisible, setContactOptionsVisible] = useState<
    string | null
  >(null);

  // Fonction de recherche et filtrage
  const prestatairesFiltres = prestataires.filter((prestataire) => {
    const correspondRecherche =
      prestataire.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      prestataire.localisation.toLowerCase().includes(recherche.toLowerCase());
    const correspondType = filtreType
      ? prestataire.type.toString() === filtreType
      : true;
    const correspondNote = filtreNote
      ? prestataire.note.toString() === filtreNote
      : true;

    return correspondRecherche && correspondType && correspondNote;
  });

  // Fonction de tri
  const trierPrestatairesF = (prestataires: IPrestataire[]) => {
    return prestataires.sort((a, b) => {
      let comparaison = 0;

      if (trierPar === 'nom') {
        comparaison = a.nom.localeCompare(b.nom);
      } else if (trierPar === 'note') {
        comparaison = b.note - a.note;
      } else if (trierPar === 'localisation') {
        comparaison = a.localisation.localeCompare(b.localisation);
      }

      return ordreCroissant ? comparaison : -comparaison;
    });
  };

  const afficherEtoilesF = (note: number) => {
    const etoile = (remplie: boolean) =>
      remplie ? iconsListe.etoile_remplie : iconsListe.etoile_vide;

    return (
      <span className="flex flex-nowrap">
        {[...Array(5)].map((_, index) => etoile(index < note))}
      </span>
    );
  };

  // Fonction pour afficher ou masquer les options de contact
  const toggleContactOptionsF = (prestataireId: string) => {
    setContactOptionsVisible((prevState) =>
      prevState === prestataireId ? null : prestataireId
    );
  };

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md mb-20">
      {/* Barre de recherche */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou localisation"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow"
        />

        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="">Type</option>
          <option value="1">Traiteur</option>
          <option value="2">DJ</option>
          <option value="3">Décorateur</option>
          <option value="4">Autre</option>
        </select>

        <select
          value={filtreNote}
          onChange={(e) => setFiltreNote(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="">Note</option>
          {[1, 2, 3, 4, 5].map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        <select
          value={trierPar}
          onChange={(e) => setTrierPar(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="nom">Trier par Nom</option>
          <option value="note">Trier par Note</option>
          <option value="localisation">Trier par Localisation</option>
        </select>

        <button
          onClick={() => setOrdreCroissant(!ordreCroissant)}
          className="p-2 border bg-white border-gray-300 rounded-md flex-grow">
          Trie {ordreCroissant ? 'Croissant' : 'Décroissant'}
        </button>
      </div>

      <ul className="space-y-6">
        {trierPrestatairesF(prestatairesFiltres).map((prestataire) => (
          <li
            key={prestataire.id}
            className="bg-white flex justify-between items-center p-4 shadow-lg rounded-lg">
            <div className="pr-2 flex-grow">
              <p className="text-lg font-medium">{prestataire.nom}</p>
              <p>
                Type:
                {
                  ['Traiteur', 'DJ', 'Décorateur', 'Autre'][
                    prestataire.type - 1
                  ]
                }
              </p>
              <p>Localisation: {prestataire.localisation}</p>
              <p className="flex flex-nowrap">
                Note: {afficherEtoilesF(prestataire.note)}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 ">
              <button
                onClick={() => toggleContactOptionsF(prestataire.id)}
                className={`text-center w-fit text-white px-4 py-1 rounded-md ${contactOptionsVisible === prestataire.id ? ' bg-red-600 hover:bg-red-800' : ' bg-blue-600 hover:bg-blue-800'}`}>
                {contactOptionsVisible === prestataire.id
                  ? 'Annuler'
                  : 'Contacter'}
              </button>

              {/* Affichage des options de contact si le bouton est cliqué */}
              {contactOptionsVisible === prestataire.id && (
                <div className="flex flex-col text-center gap-2">
                  <Link
                    to={`tel:+49${prestataire.telephone}`}
                    className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-800">
                    Appeler
                  </Link>
                  <Link
                    to={`https://wa.me/49${prestataire.telephone}`}
                    className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-800">
                    Écrire sur WhatsApp
                  </Link>
                  <Link
                    to={`mailto:${prestataire.email}`}
                    className="bg-gray-600 text-white px-4 py-1 rounded-md hover:bg-gray-800">
                    Écrire par Email
                  </Link>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PrestatairesSection;
