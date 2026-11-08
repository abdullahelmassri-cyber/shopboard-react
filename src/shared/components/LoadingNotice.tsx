export interface Props {
  message: string;
}

export function LoadingNotice({ message }: Props) {
  return (
    <p className="notice" role="status" aria-live="polite">
      {message}
    </p>
  );
}
