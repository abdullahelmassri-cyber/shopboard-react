export interface Props {}

export function EmptyCatalog(_props: Props) {
  return (
    <p className="notice" role="status">
      The collection is empty right now. Please check back soon.
    </p>
  );
}
