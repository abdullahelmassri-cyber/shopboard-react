export interface Props {}

export function CatalogLoading(_props: Props) {
  return (
    <p className="notice" role="status" aria-live="polite">
      Loading the collection…
    </p>
  );
}
