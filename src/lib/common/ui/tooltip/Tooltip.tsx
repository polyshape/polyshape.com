import { useRef, useState, type CSSProperties, type ReactElement } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow as arrowMiddleware,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  useTransitionStyles,
} from "@floating-ui/react";
import { useTooltip } from "./useTooltip";
import type { Placement } from "@floating-ui/react";

type Props = {
  label: string;
  children: ReactElement;
};

export default function Tooltip({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const cfg = useTooltip();
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const { refs, floatingStyles, context, placement, middlewareData } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(cfg.offset), flip(), shift({ padding: 8 }), arrowMiddleware({ element: arrowRef })],
  });

  const hover = useHover(context, { move: false, delay: { open: cfg.openDelay, close: cfg.closeDelay } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 250,
    initial: { opacity: 0 },
    open: { opacity: 1 },
    close: { opacity: 0 },
  });

  return (
    <>
      <span ref={refs.setReference} {...getReferenceProps({})} style={{ display: 'inline-block' }}>
        {children}
      </span>
      {isMounted && label && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="tooltip"
            style={{ ...floatingStyles, ...transitionStyles }}
            data-placement={placement}
            {...getFloatingProps()}
          >
            <div
              ref={arrowRef}
              className="tooltip__arrow"
              style={computeArrowStyle(placement, middlewareData.arrow)}
            />
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

function computeArrowStyle(
  placement: Placement,
  data: { x?: number; y?: number } | undefined
): CSSProperties {
  const base: CSSProperties = {};
  if (data?.x != null) base.left = `${data.x}px`;
  if (data?.y != null) base.top = `${data.y}px`;
  type Side = 'top' | 'right' | 'bottom' | 'left';
  const side = placement.split('-')[0] as Side;
  const staticSide: Record<Side, 'top' | 'right' | 'bottom' | 'left'> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  } as const;
  base[staticSide[side]] = '-5px';
  return base;
}
