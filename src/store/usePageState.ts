import { useImmer } from "use-immer";
import { NodeData, NodeType, PageType } from "../types";

function usePageState(initialState: PageType) {
  const [page, setPage] = useImmer<PageType>(initialState);

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  };

  const removeNodeByIndex = (index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 1);
    });
  };

  const changeNodeValue = (index: number, value: string) => {
    setPage((draft) => {
      draft.nodes[index].value = value;
    });
  };

  const changeNodeType = (index: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[index].type = type;
      draft.nodes[index].value = "";
    });
  };

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };
  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCover = (coverImage: string) => {
    setPage((draft) => {
      draft.cover = coverImage;
    });
  };

  return {
    addNode,
    removeNodeByIndex,
    changeNodeType,
    changeNodeValue,
    setNodes,
    setCover,
    setTitle,
    title: page.title,
    cover: page.cover,
    nodes: page.nodes,
  };
}

export default usePageState;
