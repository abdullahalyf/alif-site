"use client";
import { useRef, useState, type FormEvent } from "react";
import { briefSchema } from "@/content/schemas/contact";
import { contactContent as c } from "@/content/contact";
import { briefUrl } from "./brief";
export function BriefForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [url, setUrl] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = briefSchema.safeParse(data);
    setUrl("");
    if (!parsed.success) {
      const issues = Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      );
      setErrors(issues);
      form.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(issues)[0]}"]`)
        ?.focus();
      return;
    }
    setErrors({});
    const channel =
      (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") ===
      "whatsapp"
        ? "whatsapp"
        : "email";
    const destination = briefUrl(parsed.data, channel);
    setUrl(destination);
    window.open(destination, "_blank", "noopener,noreferrer");
  }
  return (
    <form ref={form} onSubmit={submit} noValidate className="brief-form">
      {Object.keys(errors).length > 0 && <p role="alert">{c.invalid}</p>}
      {c.fields.map((field) => {
        const attrs = {
          id: `brief-${field.name}`,
          name: field.name,
          "aria-invalid": Boolean(errors[field.name]),
          "aria-describedby": errors[field.name]
            ? `error-${field.name}`
            : undefined,
          required: field.name !== "company",
        };
        return (
          <div key={field.name}>
            <label htmlFor={attrs.id}>{field.label}</label>
            {field.options ? (
              <select {...attrs} defaultValue="">
                <option value="">{c.selectPlaceholder}</option>
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : field.name === "message" ? (
              <textarea {...attrs} rows={6} maxLength={3000} />
            ) : (
              <input
                {...attrs}
                type={field.name === "email" ? "email" : "text"}
                autoComplete={
                  field.name === "company" ? "organization" : field.name
                }
                maxLength={
                  field.name === "email"
                    ? 254
                    : field.name === "company"
                      ? 200
                      : 120
                }
              />
            )}
            {errors[field.name] && (
              <p id={`error-${field.name}`} className="brief-error">
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      })}
      <div className="button-row">
        <button className="button button--primary" type="submit" value="email">
          {c.emailButton}
        </button>
        <button
          className="button button--secondary"
          type="submit"
          value="whatsapp"
        >
          {c.whatsappButton}
        </button>
      </div>
      {url && (
        <p role="status">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {c.ready}
          </a>
        </p>
      )}
    </form>
  );
}
