import { Cover, Spacer, Title } from "..";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAppState } from "../../../store/AppStateContext";
import useFocusedNodeIndex from "../../../hooks/useFocusedNodeIndex";
import NodeContainer from "../../Nodes/NodeContainer";

type PageProps = {};

function Page({}: PageProps) {
  const { nodes, addNode, title, setTitle, reorderNodes } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const handleSpacerClick = () => {
    addNode({ id: nanoid(), value: "", type: "text" }, nodes.length);
  };

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <div className={styles.body}>
      <Cover />
      <div>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEvent}
      >
        <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
          {nodes.map((node, index) => (
            <NodeContainer
              key={node.id}
              updateFocusedIndex={setFocusedNodeIndex}
              index={index}
              node={node}
              isFocused={focusedNodeIndex == index}
            />
          ))}
        </SortableContext>
      </DndContext>

      <Spacer handleClick={handleSpacerClick} showHint={nodes.length === 0} />
    </div>
  );
}

export default Page;
