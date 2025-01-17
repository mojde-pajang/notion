import { useState } from "react";
import { Cover, Spacer, Title } from "..";
import styles from "./styles.module.css";
import { NodeData } from "../../../types";
import { nanoid } from "nanoid";
import useFocusedNodeIndex from "../../../hooks/useFocusedNodeIndex";
import BasicNode from "../../../Nodes/BasicNode";

type PageProps = {};

function Page({}: PageProps) {
  const [title, setTitle] = useState("Default Title");
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({
    nodes,
  });

  const addNode = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

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
        <BasicNode
          key={node.id}
          updateFocusedIndex={setFocusedNodeIndex}
          index={index}
          addNode={addNode}
          removeNodeByIndex={removeNodeByIndex}
          changeNodeValue={changeNodeValue}
          node={node}
          isFocused={focusedNodeIndex == index}
        />
      ))}
      <Spacer handleClick={handleSpacerClick} showHint={nodes.length === 0} />
    </div>
  );
}

export default Page;
