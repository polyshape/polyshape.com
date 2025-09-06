import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useTheme } from './theme/useTheme';

export default function Modal({ open, onClose, title, children, hideTitle = false }: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  hideTitle?: boolean;
}) {
  const container = useMemo(() => {
    const el = document.createElement('div');
    el.className = 'modal-root';
    return el;
  }, []);
  const { theme } = useTheme();

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
    return <></>;
  }

  const modal = (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card">
        <div className="modal__head">
          {title && (
            <h2 className={hideTitle ? 'visually-hidden' : 'modal__title'}>{title}</h2>
          )}
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <OverlayScrollbarsComponent
          options={{
            scrollbars: {
              autoHide: "never",
              theme: theme === "dark" ? "os-theme-dark" : "os-theme-light"
            }
          }}
        >
          <div className="modal__body">{children}</div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
  return createPortal(modal, container);
}
