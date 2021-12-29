import React from "react";
import { codeBlockRegex, linkRegex3 } from "../../constants";

interface TextParserProps {
  children: string;
}

export const TextParser: React.FC<TextParserProps> = ({ children }) => {
  return (
    <>
      {children.split(/(?=[ ,\n])|(?<=[ ,\n])/g).map((text, i) => {
        if (new RegExp(linkRegex3).test(text))
          return (
            <a
              key={i}
              target="_blank"
              className={"text-accent text-center hover inline font-bold"}
              href={text}
              rel="noreferrer"
            >
              {text}
            </a>
          );

        if (new RegExp(codeBlockRegex).test(text))
          return <code key={i}>{text}</code>;
        return text;
      })}
    </>
  );
};
