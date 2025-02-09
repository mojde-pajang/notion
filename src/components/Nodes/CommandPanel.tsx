import { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./commandPanel.module.css";
import { NodeType } from "../../types";
import useOverflowScreenBottom from "../../hooks/useOverflowScreenBottom";

type CommandPanelProps = {
  selectItem: (elementType: NodeType) => void;
  nodeText: string;
};

type CommandPanelItems = {
  value: NodeType;
  name: string;
};

const COMMAND_PANEL_ELEMENTS: CommandPanelItems[] = [
  { value: "title", name: "Title" },
  { value: "text", name: "Text" },
  { value: "image", name: "Image" },
  { value: "list", name: "List" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
];

function CommandPanel({ selectItem, nodeText }: CommandPanelProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overFlow, elementRef } = useOverflowScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(COMMAND_PANEL_ELEMENTS[selectedItemIndex].value);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectItem, selectedItemIndex]);

  useEffect(() => {
    const normalizeNodeText = nodeText.toLocaleLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      COMMAND_PANEL_ELEMENTS.findIndex((item) =>
        item.value.match(normalizeNodeText)
      )
    );
  }, [nodeText]);

  return (
    <div
      className={classNames(styles.panel, { [styles.reverse]: overFlow })}
      ref={elementRef}
    >
      <div>Blocks</div>
      <ul>
        {COMMAND_PANEL_ELEMENTS.map((element, index) => (
          <li
            className={selectedItemIndex === index ? styles.selected : ""}
            onClick={() => {
              selectItem(element.value);
            }}
            key={element.value}
          >
            {element.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommandPanel;
