"use server";

import { contact } from "@/data/contact";
import { readLetter, validateLetter, type Errors } from "./letter";

export type Delivery = { status: "invalid"; errors: Errors } | { status: "draft" | "sent" | "failed" };

export async function sendLetter(data: FormData): Promise<Delivery> {
  const letter = readLetter(data);
  const errors = validateLetter(letter);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const endpoint = process.env.CONTACT_DELIVERY_URL;
  if (!endpoint) return { status: "draft" };

  try {
    const token = process.env.CONTACT_DELIVERY_TOKEN;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: JSON.stringify({ ...letter, to: contact.email }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
      redirect: "error",
    });
    if (response.ok && (await response.json()).accepted === true) return { status: "sent" };
  } catch {
    // The form retains the visitor's letter when delivery cannot be confirmed.
  }
  return { status: "failed" };
}
