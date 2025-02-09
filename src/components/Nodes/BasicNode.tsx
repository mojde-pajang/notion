import { nanoid } from "nanoid";
import classNames from "classnames";
import {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import CommandPanel from "./CommandPanel";
import styles from "./BasicNode.module.css";
import { NodeData, NodeType } from "../../types";
import { useAppState } from "../../store/AppStateContext";

type BasicNodeProps = {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

function BasicNode({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node?.value.match(/^\//);
  const { addNode, removeNodeByIndex, changeNodeValue, changeNodeType } =
    useAppState();

  useEffect(() => {
    if (isFocused) {
      nodeRef?.current?.focus();
    } else {
      nodeRef?.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused && nodeRef.current) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    //tell the page the content has been edited
    changeNodeValue(index, currentTarget?.textContent || "");
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    updateFocusedIndex(index);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === "Enter") {
      event.preventDefault();
      if (target?.textContent?.[0] == "/") {
        return;
      }
      addNode({ type: node.type, id: nanoid(), value: "" }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (event.key === "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  const setNodeType = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
      nodeRef.current.focus();
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel selectItem={setNodeType} nodeText={node.value} />
      )}
      <div
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={classNames(styles.node, styles[node.type])}
        ref={nodeRef}
        contentEditable
        suppressContentEditableWarning
      />
    </>
  );
}

export default BasicNode;
