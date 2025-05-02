import styles from "./page.module.css";
import SortingVisualiser from "./components/SortingVisualiser";

export default function Home() {
  return (
    <div className={styles.page}>
      <SortingVisualiser />
    </div>
  );
}
