import React, { ReactNode } from "react";
import BaseButton from "../BaseButton/BaseButton";

type HtmlTag =
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "blockquote"
  | "br"
  | "b"
  | "i"
  | "p"
  | "section"
  | "ol"
  | "li"
  | "strong"
  | "a"
  | "ul"
  | "iframe"
  | "Element"
  | "s";

type AllowedTag = HtmlTag | typeof BaseButton;

type ChildElement = {
  tag: AllowedTag;
  value?: ReactNode;
  elementProps?: Record<string, unknown>;
  children?: ChildElement[];
};

type RecursiveComponentProps = {
  is: string | React.ElementType;
  children?: ChildElement[];
  value?: React.ReactNode;
};

const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

export function RecursiveComponent({
  is: Tag,
  children,
  value,
  elementProps = {},
  ...rest
}: RecursiveComponentProps & { elementProps?: Record<string, unknown> }) {
  if (Tag === "li" && Array.isArray(children)) {
    const wrapped: ChildElement[] = [];
    let buffer: ChildElement[] = [];

    children.forEach((child) => {
      if (child.tag === "li") {
        buffer.push(child);
      } else {
        if (buffer.length) {
          wrapped.push({ tag: "ul" as HtmlTag, children: [...buffer] });
          buffer = [];
        }
        wrapped.push(child);
      }
    });
    if (buffer.length) {
      wrapped.push({ tag: "ul" as HtmlTag, children: [...buffer] });
    }
    children = wrapped;
  }

  if (typeof Tag === "string" && voidTags.has(Tag)) {
    return <Tag {...elementProps} {...rest} />;
  }

  return (
    <Tag {...elementProps} {...rest}>
      {value}
      {children?.map((child, i) => (
        <RecursiveComponent key={i} is={child.tag as string} {...child} />
      ))}
    </Tag>
  );
}

export default RecursiveComponent;
