export interface Props {
  search: string;
  onClear: () => void;
}

export function NoMatches({ search, onClear }: Props) {
  return (
    <div className="notice" role="status">
      <p>
        {search.trim() === "" ? (
          "No products match those filters."
        ) : (
          <>No products match &ldquo;{search.trim()}&rdquo; and the selected filters.</>
        )}
      </p>
      <button type="button" className="button button--secondary" onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
