import { useState } from 'react';
import { faqData } from '../../../lib/localDB';
import { iconsListe } from '../../../lib/iconsListe';
import { IFaq } from '../../../lib/interfaces/entites';

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Recherche dynamique
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Accordéon pour catégories
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null); // Accordéon pour questions, type string pour correspondre à l'ID

  const handleFeedback = (id: string, feedback: 'helpful' | 'notHelpful') => {
    console.log(`Feedback for question ${id}: ${feedback}`);
    // TODO: Ajouter la logique pour stocker ou traiter les feedbacks.
  };

  // Filtre des FAQs basé sur la recherche
  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.reponse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Groupement des FAQs par catégorie après filtrage
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.categorie]) {
      acc[faq.categorie] = [];
    }
    acc[faq.categorie].push(faq);
    return acc;
  }, {} as Record<string, IFaq[]>);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Foire aux Questions (FAQ)</h1>

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
        {/* Affichage des catégories uniquement si elles ont des résultats */}
        {Object.keys(groupedFaqs).length > 0 ? (
          Object.keys(groupedFaqs).map((categorie) => (
            <section key={categorie}>
              <h2
                className="text-xl shadow-lg p-6 font-semibold mb-2 flex flex-nowrap items-center space-x-2 cursor-pointer"
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
        ) : (
          <p className="text-gray-500">Aucune question trouvée pour votre recherche.</p>
        )}
      </div>
    </div>
  );
};

export default Faq;
