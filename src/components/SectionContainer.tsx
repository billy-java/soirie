const SectionContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-gray-50 shadow-lg text-lg p-6 rounded-lg border border-gray-200 mb-4">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    {children}
  </section>
);

export default SectionContainer;
