import { Cover } from "..";
import styles from "./styles.module.css";

type PageProps = {};

function Page({}: PageProps) {
  return (
    <div className={styles.body}>
      <h1>Page</h1>
      <Cover />
    </div>
  );
}

export default Page;
