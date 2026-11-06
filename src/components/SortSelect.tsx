import type { SortOption } from "../modules/products/products.types";

export interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: Props) {
  return (
    <div className="field">
      <label htmlFor="sort">Sort by price</label>
      <select
        id="sort"
        value={value}
        onChange={(event) => {
          const selectedValue = event.currentTarget.value;
          if (selectedValue === "default" || selectedValue === "asc" || selectedValue === "desc") {
            onChange(selectedValue);
          }
        }}
      >
        <option value="default">Featured</option>
        <option value="asc">Price: low to high</option>
        <option value="desc">Price: high to low</option>
      </select>
    </div>
  );
}
