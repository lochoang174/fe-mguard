import React from "react";
import ReactMarkdown from "react-markdown";

// Import components

// Import types
type MDContentProps = React.PropsWithChildren;
import remarkGfm from "remark-gfm"; // Add this import
import { MDComponents } from "./MDComponents";
export default function MDContent(props: MDContentProps) {
  // const [content, setContent] = React.useState("");

  // Detect change of content
  React.useEffect(function () {}, [props.children]);

  if (typeof props.children !== "string") {
    return (
      <p className="text-red-700">
        Content of <span className="bg-outline rounded px-2 py-1">Remark</span>{" "}
        must be a string!
      </p>
    );
  }

  return (
    <ReactMarkdown components={MDComponents} remarkPlugins={[remarkGfm]}>
      {props.children}
    </ReactMarkdown>
  );
}
