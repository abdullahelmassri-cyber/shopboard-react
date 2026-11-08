import { zodResolver } from "@hookform/resolvers/zod";
import { use, useRef } from "react";
import type { FormEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { buildCartLines, cartTotal } from "../cart/cart.logic";
import { useCart } from "../cart/hooks/useCart";
import { getProductsResource } from "../products/products.resource";
import { checkoutSchema } from "./checkout.schema";
import type { CheckoutFormValues } from "./checkout.schema";

export interface Props {
  onSuccess: () => void;
}

export function CheckoutForm({ onSuccess }: Props) {
  const submissionInProgress = useRef(false);
  const { items } = useCart();
  const products = use(getProductsResource());
  const lines = buildCartLines(items, products);
  const total = cartTotal(items, products);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fullName: "", email: "", address: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  async function submitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    if (submissionInProgress.current) {
      event.preventDefault();
      return;
    }

    submissionInProgress.current = true;
    try {
      await handleSubmit(() => onSuccess())(event);
    } finally {
      submissionInProgress.current = false;
    }
  }

  if (lines.length === 0) {
    return (
      <div className="notice" role="status">
        <p>Your bag has no available items to check out.</p>
        <p>
          <Link to="/cart">Review your bag</Link> or <Link to="/">return to the shop</Link>.
        </p>
      </div>
    );
  }

  return (
    <form className="checkout-form" noValidate onSubmit={submitForm}>
      <div className="checkout-summary" aria-labelledby="checkout-summary-heading">
        <h2 id="checkout-summary-heading">Order summary</h2>
        <ul className="checkout-summary-list">
          {lines.map((line) => (
            <li key={line.id}>
              <span>
                {line.name} x {line.qty}
              </span>
              <span>${line.lineTotal.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="checkout-summary-total">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </p>
      </div>
      <FieldGroup className="checkout-fields">
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Field className="checkout-field" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
              />
              {fieldState.error && (
                <FieldError id={`${field.name}-error`}>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="checkout-field" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
              />
              {fieldState.error && (
                <FieldError id={`${field.name}-error`}>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <Field className="checkout-field" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Address</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                autoComplete="street-address"
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.error ? `${field.name}-error` : undefined}
              />
              {fieldState.error && (
                <FieldError id={`${field.name}-error`}>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="button checkout-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Complete demo checkout"}
      </Button>
      <p className="cart-count">Demo only. No order or payment will be submitted.</p>
    </form>
  );
}
