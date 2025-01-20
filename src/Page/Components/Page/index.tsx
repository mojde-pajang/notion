import { Cover, Spacer, Title } from "..";
import styles from "./styles.module.css";
import { nanoid } from "nanoid";
import useFocusedNodeIndex from "../../../hooks/useFocusedNodeIndex";
import { useAppState } from "../../../store/AppStateContext";
import NodeTypeSwitcher from "../../../Nodes/NodeTypeSwitcher";

type PageProps = {};

function Page({}: PageProps) {
  const { nodes, addNode, title, setTitle } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const handleSpacerClick = () => {
    addNode({ id: nanoid(), value: "", type: "text" }, nodes.length);
  };
  return (
    <div className={styles.body}>
      <Cover />
      <div>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
      </div>
      {nodes.map((node, index) => (
        <NodeTypeSwitcher
          key={node.id}
          updateFocusedIndex={setFocusedNodeIndex}
          index={index}
          node={node}
          isFocused={focusedNodeIndex == index}
        />
      ))}
      <Spacer handleClick={handleSpacerClick} showHint={nodes.length === 0} />
    </div>
  );
}

export default Page;
