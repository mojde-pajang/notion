import { nanoid } from "nanoid";
import { NodeData } from "../types";
import {
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import { useAppState } from "../store/AppStateContext";
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
  const { addNode, removeNodeByIndex, changeNodeValue } = useAppState();

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
  return (
    <div
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={nodeRef}
      contentEditable
      suppressContentEditableWarning
    />
  );
}

export default BasicNode;
