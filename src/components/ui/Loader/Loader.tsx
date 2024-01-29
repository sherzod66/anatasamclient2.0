import styles from "./loader.module.scss";
function Loader() {
  return (
    <div className={styles.loading}>
      <span className={styles.loader}></span>
    </div>
  );
}
export default Loader;
