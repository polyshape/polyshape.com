import { Button, ExternalLinkIcon } from "@polyutils/components";
import { AppRoutes } from "../../lib/common/AppRoutes";
import { useState, useEffect, useRef } from "react";

export default function Vision() {
  const [showButton, setShowButton] = useState(false);
  const fallbackLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const checkFallback = () => {
      if (fallbackLinkRef.current) {
        // If the fallback link is visible, hide the button
        const isVisible = fallbackLinkRef.current.offsetParent !== null;
        setShowButton(!isVisible);
      } else {
        // If the fallback link doesn't exist in DOM, PDF loaded successfully
        setShowButton(true);
      }
    };

    // Check after a short delay to allow the object to determine if it can load
    const timer = setTimeout(checkFallback, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="prose">
      <h1 className="hero__title">{AppRoutes.VISION.title}</h1>
      <p>
        PolyShape envisions agentic systems that are modular and composable into
        larger systems. They reason under uncertainty, integrate multimodal data
        and their interrelations, and operate autonomously while enabling human
        intervention. Through structured multi-agent interaction, these systems
        give rise to collective intelligence.
      </p>
      <p>
        This vision motivates a product and research agenda that treats
        collective intelligence as an emergent capability arising from agentic
        AI orchestration. The accompanying deck below summarizes this agenda and
        outlines the roadmap through which PolyShape aims to build, validate,
        and deploy such agentic AI systems.
      </p>
      <div style={{ position: "relative" }}>
        {showButton && (
          <div
            style={{
              position: "absolute",
              top: "0.7rem",
              right: "7.7rem",
              zIndex: 10,
            }}
          >
            <Button
              title="Open in New Tab"
              size="small"
              shape="circular"
              appearance="subtle"
              iconOnly
              pressEffect={false}
              styles={{
                root: { minWidth: "33px", height: "33px" },
                content: { color: "var(--global-white)" },
              }}
              icon={<ExternalLinkIcon weight={"bold"} fontSize={17} />}
              onClick={() => {
                window.open(
                  "/polyshape_vision.pdf",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            />
          </div>
        )}
        <object
          data="/polyshape_vision.pdf"
          type="application/pdf"
          width="100%"
          height="550rem"
          aria-label="Vision Document"
        >
          <p>
            Your browser doesn't support PDF viewing.{" "}
            <a 
              ref={fallbackLinkRef}
              href={"/polyshape_vision.pdf"} 
              download="polyshape_vision.pdf"
            >
              Download the PDF
            </a>{" "}
            instead.
          </p>
        </object>
      </div>
    </div>
  );
}
