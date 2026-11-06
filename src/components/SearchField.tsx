export interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, onChange }: Props) {
  return (
    <div className="field">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder="Find your next favorite"
      />
    </div>
  );
}
