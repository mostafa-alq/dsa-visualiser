import styles from "./page.module.css";
import SortingVisualiser from "./components/sortingVisualiser";

export default function Home() {
  return (
    <div className={styles.page}>
      <SortingVisualiser />
    </div>
  );
}
