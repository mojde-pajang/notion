import { ChangeEventHandler, MouseEventHandler, useRef } from "react";
import styles from "./styles.module.css";
import imageSrc from "../../../assets/images/coverimage.jpg";

type CoverProps = {};

function Cover({}: CoverProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const openDialog: MouseEventHandler<HTMLButtonElement> = () => {
    fileRef?.current?.click();
  };
  const setCover: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    console.log(target?.files?.[0]);
  };

  return (
    <div className={styles.cover}>
      <img src={imageSrc} alt="Page Cover" className={styles.image} />
      <button className={styles.button} onClick={openDialog}>
        Page cover
      </button>
      <input
        className={styles.hidden}
        type="file"
        accept="image/png, image/jpeg"
        ref={fileRef}
        onChange={setCover}
      />
    </div>
  );
}

export default Cover;
