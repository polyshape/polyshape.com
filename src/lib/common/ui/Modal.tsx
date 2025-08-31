import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export default function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}) {
  const container = useMemo(() => {
    const el = document.createElement('div');
    el.className = 'modal-root';
    return el;
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      try {
        document.body.removeChild(container);
      } catch {
        // ignore
      }
    };
  }, [container]);

  if (!open) {
    return null;
  }

  const modal = (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card">
        <div className="modal__head">
          {title && <h2 className="modal__title">{title}</h2>}
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <OverlayScrollbarsComponent
          className="modal__scroll os-theme-dark"
          options={{ scrollbars: { autoHide: 'never' } }}
        >
          <div className="modal__body">{children}</div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
  return createPortal(modal, container);
}
