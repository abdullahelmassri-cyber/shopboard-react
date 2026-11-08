import type { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message =
    error instanceof Error && error.message.length > 0
      ? error.message
      : "An unexpected error occurred.";

  return (
    <div className="notice notice--error" role="alert">
      <p>Unable to load this section. {message}</p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
