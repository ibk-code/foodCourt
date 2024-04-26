// ----------- import external deopendencies ------------
import React from "react";

// ------------- import internal dependencies -------------
import SkipToContent from "../Ally";

interface SkipToContentProps {
  children: React.ReactNode;
  content: string;
  section: string;
  allowSkip?: boolean;
}

function Seo({
  children,
  content = "Skip to content",
  section = "main",
  allowSkip,
}: SkipToContentProps) {
  return (
    <>
      {allowSkip && <SkipToContent content={content} section={section} />}
      {children}
    </>
  );
}

export default Seo;
