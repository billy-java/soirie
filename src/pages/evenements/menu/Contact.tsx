const Contact = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Contactez-nous
        </h1>

        {/* Texte d'introduction */}
        <p className="text-gray-700 text-center mb-6">
          Si vous avez des questions, des suggestions ou des problèmes, nous
          sommes là pour vous aider. N'hésitez pas à nous joindre via les moyens
          ci-dessous !
        </p>

        {/* Liste des moyens de contact */}
        <ul className="space-y-6">
          {/* Email */}
          <li className="flex items-center gap-4">
            <div className="bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l-4-4m0 0l-4 4m4-4v8m0-8L8 8m4-4l4 4"
                />
              </svg>
            </div>
            <div>
              <strong>Email :</strong>{' '}
              <a
                href="mailto:contact@exemple.com"
                className="text-indigo-600 underline hover:text-indigo-500">
                contact@exemple.com
              </a>
            </div>
          </li>

          {/* Téléphone */}
          <li className="flex items-center gap-4">
            <div className="bg-green-100 text-green-600 w-10 h-10 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10l3 3m0 0l4 4m0 0l6-6m-10 2v4m0-4L3 4m6 6h4"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <strong>Adresse :</strong>{' '}
              <span className="text-gray-800">
                123 Rue Exemple, 75000 Paris, France
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
