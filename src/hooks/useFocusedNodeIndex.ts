import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NodeData } from "../types";

type Props = {
  nodes: NodeData[];
};

function useFocusedNodeIndex({
  nodes,
}: Props): [number, Dispatch<SetStateAction<number>>] {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onkeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      } else if (event.key === "ArrowDown") {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length));
      }
    };
    document.addEventListener("keydown", onkeyDown);

    return () => document.removeEventListener("keydown", onkeyDown);
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
}

export default useFocusedNodeIndex;
