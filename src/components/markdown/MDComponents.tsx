import React from "react";
import { CopyCodeButton } from "./CopyCodeButton";

type TextHeaderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type ListType = "ul" | "ol";

const getHeaderComponent = (function () {
  const styles: { [key in TextHeaderType]: string } = {
    h1: "font-bold text-4xl mb-5",
    h2: "font-bold text-3xl mb-4",
    h3: "font-bold text-2xl mb-3",
    h4: "font-bold text-xl mb-2",
    h5: "font-bold text-lg mb-1",
    h6: "font-bold text-sm",
  };

  return function (textHeaderType: TextHeaderType) {
    return function Header({ children }: { children: React.ReactNode }) {
      return React.createElement(
        textHeaderType,
        { className: styles[textHeaderType] },
        children
      );
    };
  };
})();

const getListComponent = (function () {
  const styles: { [key in ListType]: string } = {
    ul: "list-[initial] list-inside ps-3",
    ol: "list-[initial] list-inside ps-3",
  };

  return function (listType: ListType) {
    return function List({ children }: { children: React.ReactNode }) {
      return React.createElement(
        listType,
        { className: styles[listType] },
        children
      );
    };
  };
})();

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="[&>p]:inline">{children}</li>;
}

function Break() {
  return <br />;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}

function Pre({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Image(props: { src: string; alt: string }) {
  return (
    <div className="flex justify-center my-4">
      <img className="max-w-full rounded-lg" src={props.src} alt={props.alt} />
    </div>
  );
}



function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto my-4">
      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        {children}
      </table>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="even:bg-white odd:bg-gray-50">{children}</tr>;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 border-b border-r border-gray-300 text-left font-medium text-gray-700">
      {children}
    </th>
  );
}

function TableData({ children }: { children: React.ReactNode }) {
  const processContent = (content: React.ReactNode) => {
    if (typeof content === "string") {
      return content.replace(/\\n/g, "\n");
    }
    return content;
  };
  return (
    <td className="px-4 py-3 border-b border-r border-gray-300 align-top">
      <div className="whitespace-pre-line">{processContent(children)}</div>
    </td>
  );
}

export const MDComponents = {
  h1: getHeaderComponent("h1"),
  h2: getHeaderComponent("h2"),
  h3: getHeaderComponent("h3"),
  h4: getHeaderComponent("h4"),
  h5: getHeaderComponent("h5"),
  h6: getHeaderComponent("h6"),
  ul: getListComponent("ul"),
  ol: getListComponent("ol"),
  li: ListItem,
  p: Paragraph,
  pre: Pre,
  br: Break,
  img: Image,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableData,
};
