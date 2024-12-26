export const Titre1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={`text-4xl font-bold text-indigo-600 mb-4 text-center ${className}`}>
    {children}
  </h1>
);

export const Titre2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={`text-3xl font-bold mb-6 text-indigo-600 ${className}`}>
    {children}
  </h2>
);

export const Titre3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3 className={`text-2xl font-bold mb-6 text-indigo-600 ${className}`}>
    {children}
  </h3>
);
