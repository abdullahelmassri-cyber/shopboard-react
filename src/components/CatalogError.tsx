export interface Props {
  message: string;
  onRetry: () => void;
}

export function CatalogError({ message, onRetry }: Props) {
  return (
    <div className="notice notice--error" role="alert">
      <p>We couldn’t load the collection. {message}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
