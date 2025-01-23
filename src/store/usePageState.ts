import { useImmer } from "use-immer";
import { NodeData, NodeType, PageType } from "../types";
import { arrayMove } from "@dnd-kit/sortable";

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

  const reorderNodes = (id1: string, id2: string) => {
    setPage((draft) => {
      const index1 = draft.nodes.findIndex((node) => node.id === id1);
      const index2 = draft.nodes.findIndex((node) => node.id === id2);
      draft.nodes = arrayMove(draft.nodes, index1, index2);
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
    reorderNodes,
    title: page.title,
    cover: page.cover,
    nodes: page.nodes,
  };
}

export default usePageState;
