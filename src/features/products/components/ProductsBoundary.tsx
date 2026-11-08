import { Suspense } from "react";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { resetProductsResource } from "../products.resource";
import { ErrorFallback } from "../../../shared/components/ErrorFallback";
import { LoadingNotice } from "../../../shared/components/LoadingNotice";

export interface Props {
  loadingMessage: string;
  children: ReactNode;
}

export function ProductsBoundary({ loadingMessage, children }: Props) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetProductsResource}>
      <Suspense fallback={<LoadingNotice message={loadingMessage} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
