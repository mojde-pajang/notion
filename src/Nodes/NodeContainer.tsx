import { NodeData } from "../types";
import NodeTypeSwitcher from "./NodeTypeSwitcher";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./NodeContainer.module.css";

type NodeContainerProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

function NodeContainer({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeContainerProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={styles.container}
    >
      <div className={styles.dragHandle}> ⠿ </div>
      <NodeTypeSwitcher
        key={node.id}
        updateFocusedIndex={updateFocusedIndex}
        index={index}
        node={node}
        isFocused={isFocused}
      />
    </div>
  );
}

export default NodeContainer;
