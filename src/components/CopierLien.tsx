import React from 'react';
interface CopyButtonProps {
  lien: string;
}

const CopierLien: React.FC<CopyButtonProps> = ({ lien }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(lien);
      alert('Lien copié dans le presse-papier !');
    } catch (err) {
      console.error('Erreur lors de la copie :', err);
      alert('Impossible de copier le lien.');
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-800 focus:outline-none">
      Copier le lien !
    </button>
  );
};

export default CopierLien;
