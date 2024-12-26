import { jsPDF } from 'jspdf';

interface IsectionProps{
  sectionString: string;
}

const ExportPDFButton = (sectionString: IsectionProps) => {
  const exporterEnPDF = () => {
    const doc = new jsPDF();

    // Cibler la section à exporter en PDF
    const section = document.getElementById(sectionString.sectionString);
    if (section) {
      // Ajouter le contenu HTML de la section dans le PDF
      doc.html(section, {
        callback: function (doc) {
          // Sauvegarder le PDF après génération
          doc.save('argent_details.pdf');
        },
        margin: [10, 10, 10, 10], // Marge autour du contenu
        x: 10, // Position horizontale
        y: 10, // Position verticale
        width: 180, // Largeur de la page (peut être ajustée)
        windowWidth: 800, // Largeur de la fenêtre pour la mise en page
      });
    }
  };
  return (
    <button
      onClick={exporterEnPDF}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800">
      Exporter en PDF
    </button>
  );
};

export default ExportPDFButton;
