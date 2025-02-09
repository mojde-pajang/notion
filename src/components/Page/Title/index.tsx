import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { NodeData } from "../../../types";

type TitleProps = {
  title: string;
  changePageTitle(title: string): void;
  addNode(node: NodeData, index: number): void;
};

function Title({ title, changePageTitle, addNode }: TitleProps) {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement == headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        ref={headerRef}
        className={styles.title}
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            event.preventDefault();
            addNode({ id: nanoid(), type: "text", value: "" }, 0);
          }
        }}
        onInput={(e) => changePageTitle(e.currentTarget.textContent || "")}
      />
    </div>
  );
}

export default Title;
