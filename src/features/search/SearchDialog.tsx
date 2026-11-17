"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { searchContent as c } from "@/content/search";
import { searchIndexSchema, type SearchEntry } from "@/content/schemas/search";
import { searchEntries } from "./score";
import { useOpenSearch } from "./search-context";

/**
 * The search dialog itself.
 *
 * It is mounted once, in the header, so the ⌘K shortcut works from any route.
 * The trigger button lives in `SearchTrigger`, which reaches this component
 * through the shared context below.
 */
export function SearchDialog() {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const controller = useRef<AbortController | null>(null);
  const groups = Object.keys(c.groups) as SearchEntry["type"][];
  const matched = searchEntries(entries, query);
  const results = groups.flatMap((type) =>
    matched.filter((entry) => entry.type === type),
  );
  const open = useCallback(() => {
    if (dialog.current?.open) return;
    previous.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    input.current?.focus();
    setQuery("");
    setActive(0);
    setStatus(c.loading);
    controller.current?.abort();
    const abort = new AbortController();
    controller.current = abort;
    fetch(c.indexPath, { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        setEntries(searchIndexSchema.parse(data));
        setStatus("");
      })
      .catch(() => {
        if (!abort.signal.aborted) setStatus(c.error);
      });
  }, []);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      controller.current?.abort();
    };
  }, [open]);
  // The header's search button asks the dialog to open by dispatching an
  // event, so the two never need to know about each other's position in the
  // component tree.
  useOpenSearch(open);
  useEffect(() => {
    if (dialog.current?.open)
      document
        .getElementById(`${id}-result-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active, id]);
  function close() {
    controller.current?.abort();
    dialog.current?.close();
    previous.current?.focus();
  }
  return (
    <dialog
      className="site-search-dialog"
      ref={dialog}
      aria-labelledby={`${id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab") {
          const elements = Array.from(
            dialog.current!.querySelectorAll<HTMLElement>(
              "button, input, a[href]",
            ),
          );
          const first = elements[0],
            last = elements.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <div className="search-dialog-header">
        <h2 id={`${id}-title`}>{c.open}</h2>
        <button className="button button--secondary" onClick={close}>
          {c.close}
        </button>
      </div>
      <label htmlFor={`${id}-input`}>{c.label}</label>
      <input
        ref={input}
        id={`${id}-input`}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(0);
        }}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={`${id}-results`}
        aria-activedescendant={
          !status && results[active] ? `${id}-result-${active}` : undefined
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setActive((index) =>
              results.length
                ? (index +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    results.length) %
                  results.length
                : 0,
            );
          }
          if (event.key === "Enter" && !status && results[active]) {
            event.preventDefault();
            window.location.assign(results[active].href);
          }
        }}
      />
      <p>{c.hint}</p>
      <p role="status" aria-live="polite">
        {status ||
          (results.length ? `${results.length} ${c.resultsLabel}` : c.empty)}
      </p>
      <div id={`${id}-results`} role="listbox" aria-label={c.label}>
        {!status &&
          groups.map((type) => {
            const list = results.filter((entry) => entry.type === type);
            return (
              list.length > 0 && (
                <div
                  role="group"
                  aria-labelledby={`${id}-${type}`}
                  key={type}
                >
                  <h3 role="presentation" id={`${id}-${type}`}>
                    {c.groups[type]}
                  </h3>
                  {list.map((entry) => {
                    const index = results.indexOf(entry);
                    return (
                      <a
                        key={entry.href}
                        id={`${id}-result-${index}`}
                        href={entry.href}
                        role="option"
                        aria-selected={active === index}
                        onFocus={() => setActive(index)}
                      >
                        <strong>{entry.title}</strong>
                        <span>{entry.description}</span>
                      </a>
                    );
                  })}
                </div>
              )
            );
          })}
      </div>
    </dialog>
  );
}
