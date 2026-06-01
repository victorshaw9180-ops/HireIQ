import Stripe from "stripe";

export const stripe =
  process.env.STRIPE_SECRET_KEY &&
  process.env.STRIPE_SECRET_KEY !== "placeholder"
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2026-05-27.dahlia",
      })
    : null;