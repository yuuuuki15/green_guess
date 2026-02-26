interface Props {
  source: string;
  disclaimer: string;
}

export function Footer({ source, disclaimer }: Props) {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/60 px-4 py-4 text-center text-xs text-gray-500">
      <p>{source}</p>
      <p className="mt-1">{disclaimer}</p>
    </footer>
  );
}
