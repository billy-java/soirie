import React, { useState } from 'react';
import { iconsListe } from '../lib/iconsListe';

interface IPrestataire {
  id: string;
  nom: string;
  type: 1 | 2 | 3 | 4; // 1 = Traiteur, 2 = DJ, 3 = Décorateur, 4 = Autre
  localisation: string;
  gammePrix: string;
  note: 1 | 2 | 3 | 4 | 5;
  telephone: string; // Nouveau champ
  email: string; // Nouveau champ
}

interface PrestatairesProps {
  prestatairesInitiales: IPrestataire[];
}

const PrestatairesSection: React.FC<PrestatairesProps> = ({
  prestatairesInitiales = [],
}) => {
  const [prestataires] = useState<IPrestataire[]>(prestatairesInitiales);

  // Etats pour la recherche et les filtres
  const [search, setSearch] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('');
  const [filterRating, setFilterRating] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('nom'); // Critère de tri (nom, note, localisation)

  // Fonction de recherche et filtrage
  const filteredPrestataires = prestataires.filter((prestataire) => {
    const matchesSearch =
      prestataire.nom.toLowerCase().includes(search.toLowerCase()) ||
      prestataire.localisation.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType
      ? prestataire.type.toString() === filterType
      : true;
    const matchesPrice = filterPriceRange
      ? prestataire.gammePrix === filterPriceRange
      : true;
    const matchesRating = filterRating
      ? prestataire.note.toString() === filterRating
      : true;

    return matchesSearch && matchesType && matchesPrice && matchesRating;
  });

  // Fonction de tri
  const sortPrestataires = (prestataires: IPrestataire[]) => {
    return prestataires.sort((a, b) => {
      if (sortBy === 'nom') {
        return a.nom.localeCompare(b.nom);
      }
      if (sortBy === 'note') {
        return b.note - a.note;
      }
      if (sortBy === 'localisation') {
        return a.localisation.localeCompare(b.localisation);
      }
      return 0;
    });
  };

  const renderStars = (note: number) => {
    const etoile = (remplie: boolean) =>
      remplie ? iconsListe.etoile_remplie : iconsListe.etoile_vide;

    return (
      <span className="flex flex-nowrap">
        {[...Array(5)].map((_, index) => etoile(index < note))}
      </span>
    );
  };

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md mb-20">
      <h2 className="text-lg font-bold">Gestion des Prestataires :</h2>

      {/* Barre de recherche */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou localisation"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="">Type</option>
          <option value="1">Traiteur</option>
          <option value="2">DJ</option>
          <option value="3">Décorateur</option>
          <option value="4">Autre</option>
        </select>

        <select
          value={filterPriceRange}
          onChange={(e) => setFilterPriceRange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="">Gamme de prix</option>
          <option value="Bas">Bas</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevée">Élevée</option>
        </select>

        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="">Note</option>
          {[1, 2, 3, 4, 5].map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-grow">
          <option value="nom">Trier par Nom</option>
          <option value="note">Trier par Note</option>
          <option value="localisation">Trier par Localisation</option>
        </select>
      </div>

      <ul className="bg-white rounded-md p-2">
        {sortPrestataires(filteredPrestataires).map((prestataire) => (
          <li
            key={prestataire.id}
            className="flex justify-between items-center p-2 border-b last:border-none">
            <div>
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
              <p>Gamme de prix: {prestataire.gammePrix}</p>
              <p className="flex flex-nowrap">
                Note: {renderStars(prestataire.note)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-fit">
              {/* Boutons pour appeler et envoyer un message */}
              <a
                href={`tel:+49${prestataire.telephone}`} // Numéro allemand
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-fit h-10">
                Appeler
              </a>
              <a
                href={`https://wa.me/49${prestataire.telephone}`} // Lien WhatsApp
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-fit h-10">
                Écrire sur WhatsApp
              </a>
              <a
                href={`mailto:${prestataire.email}`} // Lien pour email
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-fit h-10">
                Écrire par Email
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PrestatairesSection;
