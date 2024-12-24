import { useState } from 'react';
import { faqData } from '../../../lib/localDB';
import { iconsListe } from '../../../lib/iconsListe';
import { IFaq } from '../../../lib/interfaces/entites';
import Fuse from 'fuse.js';

const Aide = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Recherche dynamique
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Accordéon pour catégories
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null); // Accordéon pour questions, type string pour correspondre à l'ID

  const handleFeedback = (id: string, feedback: 'helpful' | 'notHelpful') => {
    console.log(`Feedback for question ${id}: ${feedback}`);
    // TODO: Ajouter la logique pour stocker ou traiter les feedbacks.
  };

  // Configuration de Fuse.js pour une recherche fuzzy
  const fuse = new Fuse(faqData, {
    keys: ['question', 'reponse'], // Champs à inclure dans la recherche
    threshold: 0.3, // Plus la valeur est basse, plus la recherche est stricte
    includeScore: false,
    ignoreLocation: true,
  });

  // Filtre des FAQs basé sur la recherche
  const filteredFaqs = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : faqData;

  // Groupement des FAQs par catégorie après filtrage (uniquement si pas de recherche)
  const groupedFaqs = searchQuery
    ? {}
    : faqData.reduce(
        (acc, faq) => {
          if (!acc[faq.categorie]) {
            acc[faq.categorie] = [];
          }
          acc[faq.categorie].push(faq);
          return acc;
        },
        {} as Record<string, IFaq[]>
      );

  return (
    <div className="p-6 bg-gray-100 h-screen flex flex-col items-center">
      <section className="flex-grow">
        <h1 className="text-2xl text-indigo-600 font-bold mb-4">
          Liste des questions les plus frequentes (FAQ)
        </h1>

        {/* Barre de Recherche */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="space-y-6">
          {/* Résultats de recherche */}
          {searchQuery ? (
            filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="shadow-lg p-4 rounded-lg bg-white border border-gray-100">
                    <h3 className="font-semibold text-lg text-indigo-600">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-gray-700">{faq.reponse}</p>
                    <div className="mt-2 flex gap-4">
                      <button
                        onClick={() => handleFeedback(faq.id, 'helpful')}
                        className="text-green-600 underline">
                        Utile
                      </button>
                      <button
                        onClick={() => handleFeedback(faq.id, 'notHelpful')}
                        className="text-red-600 underline">
                        Pas utile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                Aucune question trouvée pour votre recherche.
              </p>
            )
          ) : (
            // Affichage des catégories uniquement si pas de recherche
            Object.keys(groupedFaqs).map((categorie) => (
              <section key={categorie}>
                <h2
                  className=" rounded-lg text-xl shadow-lg p-6 font-semibold mb-2 flex flex-nowrap items-center space-x-2 cursor-pointer"
                  onClick={() =>
                    setActiveCategory((prev) =>
                      prev === categorie ? null : categorie
                    )
                  }>
                  <p className="flex flex-grow">{categorie}</p>
                  <p>
                    {activeCategory === categorie
                      ? iconsListe.menu_PLUS
                      : iconsListe.menu_MOINS}
                  </p>
                </h2>
                {activeCategory === categorie && (
                  <div className="space-y-4 flex flex-col items-center">
                    {groupedFaqs[categorie].map((faq) => (
                      <div
                        key={faq.id}
                        className="shadow-lg p-4 w-[90%] rounded-lg bg-white border border-gray-100">
                        <h3
                          className="font-semibold flex flex-nowrap items-center space-x-8 text-lg text-indigo-600 cursor-pointer"
                          onClick={() =>
                            setActiveQuestion((prev) =>
                              prev === faq.id ? null : faq.id
                            )
                          }>
                          <p className="flex-grow">{faq.question}</p>
                          <p>
                            {activeQuestion === faq.id
                              ? iconsListe.menu_PLUS
                              : iconsListe.menu_MOINS}
                          </p>
                        </h3>
                        {activeQuestion === faq.id && (
                          <>
                            <p className="mt-2 text-gray-700">{faq.reponse}</p>
                            <div className="mt-2 flex gap-4">
                              <button
                                onClick={() =>
                                  handleFeedback(faq.id, 'helpful')
                                }
                                className="text-green-600 underline">
                                Utile
                              </button>
                              <button
                                onClick={() =>
                                  handleFeedback(faq.id, 'notHelpful')
                                }
                                className="text-red-600 underline">
                                Pas utile
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))
          )}
        </div>
      </section>

      <section className="bg-white shadow-lg mt-6 p-6 rounded-lg gap-5 flex flex-col items-center">
        <h2 className="text-2xl text-indigo-600  font-semibold text-center">
          Nous contacter
        </h2>
        <p className="text-lg">
          Si cette page na pas pu vous aider, vous pouvez nous ecrire pour poser
          votre question. Nous vous repondrons dans quelques heures.
        </p>
        <div className="flex flex-wrap items-center gap-2 w-fit">
          {/* Boutons pour appeler et envoyer un message */}
          <a
            href={`tel:+49000000`} // Numéro allemand
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-fit h-10">
            Appeler
          </a>
          <a
            href={`https://wa.me/49000000000000`} // Lien WhatsApp
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-fit h-10">
            Écrire sur WhatsApp
          </a>
          <a
            href={`mailto:00000000000`} // Lien pour email
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-fit h-10">
            Écrire par Email
          </a>
        </div>
      </section>
    </div>
  );
};

export default Aide;
