import { Cover, Spacer } from "..";
import styles from "./styles.module.css";

type PageProps = {};

function Page({}: PageProps) {
  return (
    <div className={styles.body}>
      <h1>Page</h1>
      <Cover />
      <Spacer handleClick={() => console.log(2)} showHint={true} />
    </div>
  );
}

export default Page;
