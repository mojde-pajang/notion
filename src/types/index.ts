export type NodeType =
  | "text"
  | "title"
  | "image"
  | "list"
  | "heading1"
  | "heading2"
  | "heading3";

export type NodeData = {
  id: string;
  type: NodeType;
  value: string;
};

export type PageType = {
  id: string;
  slug: string;
  title: string;
  nodes: NodeData[];
  cover: string;
};
