import type { CatalogCategory, Category } from "../products.types";

export interface Props {
  value: CatalogCategory;
  options: Category[];
  onChange: (value: CatalogCategory) => void;
}

export function CategoryFilter({ value, options, onChange }: Props) {
  return (
    <div className="field">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={value}
        onChange={(event) => {
          const selectedValue = event.currentTarget.value;
          if (selectedValue === "all") {
            onChange("all");
            return;
          }
          const selectedCategory = options.find((category) => category === selectedValue);
          if (selectedCategory !== undefined) onChange(selectedCategory);
        }}
      >
        <option value="all">All categories</option>
        {options.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
