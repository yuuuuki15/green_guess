interface Props {
  source: string;
  disclaimer: string;
}

export function Footer({ source, disclaimer }: Props) {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/60 px-4 py-4 text-center text-xs text-gray-500">
      <p>{source}</p>
      <p className="mt-1">{disclaimer}</p>
      <p className="mt-2">
        Made by{' '}
        <a
          href="https://github.com/yuuuuki15"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline hover:text-primary-dark"
        >
          @yuuuuki15
        </a>
      </p>
    </footer>
  );
}
