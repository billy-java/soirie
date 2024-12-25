import { iconsListe } from '../../../lib/iconsListe';

const Contact = () => {
  return (
    <div className="p-8 text-xl bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Contactez-nous
        </h1>

        {/* Texte d'introduction */}
        <p className="text-gray-700 text-center text-lg mb-6">
          Si vous avez des questions, des suggestions ou des problèmes, nous
          sommes là pour vous aider. N'hésitez pas à nous joindre via les moyens
          ci-dessous !
        </p>

        {/* Liste des moyens de contact */}
        <ul className="space-y-6 mt-10">
          {/* Email */}
          <li className="flex items-center gap-4">
            <div className="bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full">
              {iconsListe.mail}
            </div>
            <div>
              <strong>Email :</strong>{' '}
              <a
                href="mailto:contactcm02@gmail.com"
                className="text-indigo-600 underline hover:text-indigo-500">
                contactcm02@gmail.com
              </a>
            </div>
          </li>

          {/* Téléphone */}
          <li className="flex items-center gap-4">
            <div className="bg-green-100 text-green-600 w-10 h-10 flex items-center justify-center rounded-full">
              {iconsListe.telephone}
            </div>
            <div>
              <strong>Téléphone :</strong>{' '}
              <a
                href="tel:+33123456789"
                className="text-green-600 underline hover:text-green-500">
                +33 1 23 45 67 89
              </a>
            </div>
          </li>

          {/* Adresse */}
          <li className="flex items-center gap-4">
            <div className="bg-yellow-100 text-yellow-600 w-10 h-10 flex items-center justify-center rounded-full">
              {iconsListe.position}
            </div>
            <div>
              <strong>Adresse :</strong>{' '}
              <span className="text-gray-800">35390 Gießen.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
