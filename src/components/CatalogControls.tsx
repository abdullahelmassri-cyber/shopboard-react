import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export function CatalogControls({ children }: Props) {
  return <div className="controls">{children}</div>;
}
