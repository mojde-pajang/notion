export type NodeType = "text" | "tile" | "image" | "heading 1" | "heading 2";

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
