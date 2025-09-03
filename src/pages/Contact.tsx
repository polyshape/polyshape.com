// Contact.tsx
import { useState } from 'react';
import { AppRoutes } from '../lib/common/AppRoutes';

type Status = 'idle' | 'sending' | 'success' | 'error';
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<{ [key: string]: boolean }>({});

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

  setError(null);
  setStatus("idle");

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
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      company: String(fd.get('company') ?? ''),
    };

    const newInvalid: typeof invalid = {};
    ['name', 'email', 'message'].forEach(f => {
      const value = payload[f as keyof typeof payload].trim();
      if (!value) {
        newInvalid[f] = true;
      } else if (f === 'email' && !RE_EMAIL.test(value)) {
        newInvalid[f] = true;
      }
    });
    setInvalid(newInvalid);

    const clientErr = validate(payload);
    if (clientErr) {
      setStatus('error');
      setError(clientErr);
      return;
    }

    if (payload.company) {
      setStatus('success');
      form.reset();
      setInvalid({});
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      type ContactResponse = { ok?: boolean; error?: string; dryRun?: boolean };
      const data = (await res.json().catch(() => ({}))) as ContactResponse;
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || 'Failed to send');
      }
      setStatus('success');
      form.reset();
      setInvalid({});
    } catch (err: unknown) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to send');
    }
  }

  return (
    <div className="prose prose--big">
      <h1 className="hero__title">{AppRoutes.CONTACT.title}</h1>
      <div className="contact-form__wrapper">
        <div className="contact-form--message--wrapper">
          <h1>Get in touch</h1>
          <p className="contact-form--message">PolyShape LTD</p>
          <p className="contact-form--message">The Accountancy Partnership</p>
          <p className="contact-form--message">Twelve Quays House</p>
          <p className="contact-form--message">Egerton Wharf</p>
          <p className="contact-form--message">Wirral</p>
          <p className="contact-form--message">United Kingdom</p>
          <p className="contact-form--message">CH41 1LD</p>
        </div>

        <form onSubmit={onSubmit} className="contact-form" noValidate>
          <div className="contact-form__field">
            <div className="floating-label-group">
              <input
                className={`contact-form__control ${invalid.name ? 'contact-form__control--error' : ''}`}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
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
                required
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
                required
                onChange={handleChange}
                onBlur={e => e.target.value ? e.target.classList.add('has-value') : e.target.classList.remove('has-value')}
              />
              <label htmlFor="message">Message <span className="required">(required)</span></label>
            </div>
          </div>
          <div className="contact-form__actions">
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {status === 'success' && <span className="hint success">Thanks! We'll get back to you.</span>}
            {status === 'error' && error && <span className="hint error">{error}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
