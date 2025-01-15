import styles from "./styles.module.css";

type SpacerProps = {
  showHint: boolean;
  handleClick(): void;
};

function Spacer({ showHint, handleClick }: SpacerProps) {
  return (
    <div className={styles.spacer} onClick={handleClick}>
      {showHint && <p>Click to edit first paragraph</p>}
    </div>
  );
}

export default Spacer;
