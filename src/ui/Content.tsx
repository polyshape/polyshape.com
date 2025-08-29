import type { ReactNode } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export default function Content({ children }: { children: ReactNode }) {
  return (
    <OverlayScrollbarsComponent
      className="content os-theme-dark"
      options={{ scrollbars: { autoHide: 'never' } }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
