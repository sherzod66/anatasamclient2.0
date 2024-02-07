import styles from "@/assets/styles/loader.module.scss";
function Loading() {
  return (
    <div className={styles.loading}>
      <span className={styles.loader}></span>
    </div>
  );
}
export default Loading;
