import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AppRoutes } from '../lib/common/AppRoutes';
import { isDev, getEnvVar } from "../lib/env";
import { useLoading } from '../lib/common/ui/spinner/useLoading';

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isMacOS(): boolean {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };

  return nav.userAgentData?.platform
    ? nav.userAgentData.platform.toLowerCase() === "macos"
    : /mac/i.test(navigator.userAgent);
}

export default function Contact() {
  const { state: loadingState, setLoadingState } = useLoading();
  const [invalid, setInvalid] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!(isDev() && getEnvVar("VITE_USE_MSW") === "true")) {
      return; // only in dev with flag
    }

    function handleShortcut(e: KeyboardEvent) {
      const isMac = isMacOS();
      // Ctrl+Alt+F (or Cmd+Opt+F on Mac)
      const fail = isMac
        ? e.metaKey && e.altKey && e.key === "f"
        : e.ctrlKey && e.altKey && e.key === "f";

      // Ctrl+Alt+E (or Cmd+Opt+E on Mac)
      const happy = isMac
        ? e.metaKey && e.altKey && e.key === "s"
        : e.ctrlKey && e.altKey && e.key === "s";

      if (happy || fail) {
        const nameInput = document.querySelector<HTMLInputElement>("#name");
        const emailInput = document.querySelector<HTMLInputElement>("#email");
        const messageInput = document.querySelector<HTMLTextAreaElement>("#message");

        if (nameInput && emailInput && messageInput) {
          nameInput.value = "Test User";
          emailInput.value = "test@example.com";
          messageInput.value = fail
          ? "Hello from shortcut! Fail"
          : "Hello from shortcut!";

          // fire input events so React picks up the change
          nameInput.dispatchEvent(new Event("input", { bubbles: true }));
          emailInput.dispatchEvent(new Event("input", { bubbles: true }));
          messageInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  function validate(payload: { name: string; email: string; message: string }) {
    if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
      return 'Required fields missing.';
    }
    if (!RE_EMAIL.test(payload.email)) {
      return 'Please enter a valid email.';
    }
    if (payload.name.length > 200 || payload.message.length > 8000) {
      return 'Field too long.';
    }
    return null;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  const { name, value } = e.target;

  setInvalid(prev => {
    const updated = { ...prev };
    if (!value.trim()) {
      updated[name] = true;
    } else {
      if (name === "email") {
        updated[name] = !RE_EMAIL.test(value);
      } else {
        delete updated[name];
      }
    }
    return updated;
  });
}


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      company: String(fd.get("company") ?? ""),
    };

    const newInvalid: typeof invalid = {};
    ["name", "email", "message"].forEach((f) => {
      const value = payload[f as keyof typeof payload].trim();
      if (!value) {
        newInvalid[f] = true;
      } else if (f === "email" && !RE_EMAIL.test(value)) {
        newInvalid[f] = true;
      }
    });
    setInvalid(newInvalid);

    const clientErr = validate(payload);
    if (clientErr) {
      toast.error(clientErr);
      return;
    }

    if (payload.company) {
      form.reset();
      setInvalid({});
      toast.success("Thanks! We'll get back to you.");
      return;
    }

    try {
      // 👇 show global overlay while sending
      setLoadingState("loading");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      type ContactResponse = { ok?: boolean; error?: string; dryRun?: boolean };
      const data = (await res.json().catch(() => ({}))) as ContactResponse;

      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Failed to send");
      }

      form.reset();
      setInvalid({});
      toast.success("Thanks! We'll get back to you.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      // 👇 always hide overlay
      setLoadingState(null);
    }
  }

  return (
    <div className="prose prose--big">
      <h1 className="hero__title">{AppRoutes.CONTACT.title}</h1>
      <form onSubmit={onSubmit} className="contact-form" noValidate>
        <div className="contact-form__field">
          <div className="floating-label-group">
            <input
              className={`contact-form__control ${invalid.name ? 'contact-form__control--error' : ''}`}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              aria-required="true"
              onChange={handleChange}
              onBlur={e => e.target.value ? e.target.classList.add('has-value') : e.target.classList.remove('has-value')}
            />
            <label htmlFor="name">Name <span className="required">(required)</span></label>
          </div>
        </div>
        <div className="contact-form__field">
          <div className="floating-label-group">
            <input
              className={`contact-form__control ${invalid.email ? 'contact-form__control--error' : ''}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-required="true"
              onChange={handleChange}
              onBlur={e => e.target.value ? e.target.classList.add('has-value') : e.target.classList.remove('has-value')}
            />
            <label htmlFor="email">Email <span className="required">(required)</span></label>
          </div>
        </div>
        <div className="contact-form__field" style={{ display: 'none' }}>
          <div className="floating-label-group">
            <input className="contact-form__control" id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            <label htmlFor="company">Company</label>
          </div>
        </div>
        <div className="contact-form__field">
          <div className="floating-label-group">
            <textarea
              className={`contact-form__control ${invalid.message ? 'contact-form__control--error' : ''}`}
              id="message"
              name="message"
              rows={6}
              aria-required="true"
              title=""
              onChange={handleChange}
              onBlur={e => e.target.value ? e.target.classList.add('has-value') : e.target.classList.remove('has-value')}
            />
            <label htmlFor="message">Message <span className="required">(required)</span></label>
          </div>
        </div>
        <div className="contact-form__actions">
          <button className="button__primary" type="submit" disabled={loadingState === 'loading'}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
