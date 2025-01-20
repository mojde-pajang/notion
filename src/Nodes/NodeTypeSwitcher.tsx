import { NodeData, NodeType } from "../types";
import BasicNode from "./BasicNode";

type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

function NodeTypeSwitcher({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeTypeSwitcherProps) {
  const TEXT_NODES: NodeType[] = [
    "text",
    "title",
    "heading 1",
    "heading 2",
    "heading 3",
  ];

  if (TEXT_NODES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    );
  } else {
    return null;
  }
}

export default NodeTypeSwitcher;
