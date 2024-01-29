import styles from "./dashboard.module.scss";
import { dashboardBarList } from "@/assets/dashboard/dashboardList";
import Model from "@/components/ui/admin popup/Model";
type Props = {
  params: { id: string };
};
export default async function ManagerPage({ params }: Props) {
  const thisDashboard = dashboardBarList.find((i) =>
    i.link.includes(params.id)
  );
  return (
    <main className={styles.detailDash}>
      <div className={styles.detailDash__row}>
        <h1>{thisDashboard?.title}</h1>
        <Model />
      </div>
      {/* <Search /> */}
      <section className={styles.detailDash__content}>
        {thisDashboard ? (
          <thisDashboard.DashboardComponent />
        ) : (
          <h2>Not found</h2>
        )}
      </section>
    </main>
  );
}
