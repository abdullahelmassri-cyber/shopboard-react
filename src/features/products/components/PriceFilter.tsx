import type { PriceRange } from "../products.types";

export interface Props {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

function parsePrice(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : undefined;
}

export function PriceFilter({ value, onChange }: Props) {
  function updateMinimum(input: string): void {
    onChange({ ...value, min: parsePrice(input) });
  }

  function updateMaximum(input: string): void {
    onChange({ ...value, max: parsePrice(input) });
  }

  return (
    <>
      <div className="field">
        <label htmlFor="minimum-price">Minimum price</label>
        <input
          id="minimum-price"
          type="number"
          min="0"
          step="any"
          value={value.min ?? ""}
          onChange={(event) => updateMinimum(event.currentTarget.value)}
          placeholder="No minimum"
        />
      </div>
      <div className="field">
        <label htmlFor="maximum-price">Maximum price</label>
        <input
          id="maximum-price"
          type="number"
          min="0"
          step="any"
          value={value.max ?? ""}
          onChange={(event) => updateMaximum(event.currentTarget.value)}
          placeholder="No maximum"
        />
      </div>
    </>
  );
}
