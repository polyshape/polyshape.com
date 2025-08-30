import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
      company: String(fd.get('company') ?? ''),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      type ContactResponse = { ok?: boolean; error?: string; dryRun?: boolean };
      const json = (await res.json().catch(() => ({}))) as unknown;
      const data: ContactResponse = (json && typeof json === 'object') ? (json as ContactResponse) : {};
      if (!res.ok || data.ok === false) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      form.reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send';
      setStatus('error');
      setError(msg);
    }
  }

  return (
    <div className="prose prose__big">
      <h1 className="hero__title">Contact</h1>
      <p>Get in touch with PolyShape.</p>

      <form onSubmit={onSubmit} className="contact-form" noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input className="contact-form-field" id="name" name="name" type="text" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input className="contact-form-field" id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field" style={{ display: 'none' }}>
          <label htmlFor="company">Company</label>
          <input className="contact-form-field" id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea className="contact-form-field" id="message" name="message" rows={6} required />
        </div>
        <div className="actions">
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'success' && <span className="hint success">Thanks! We’ll get back to you.</span>}
          {status === 'error' && <span className="hint error">{error || 'Something went wrong.'}</span>}
        </div>
      </form>
    </div>
  );
}
