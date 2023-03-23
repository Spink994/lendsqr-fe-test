import { Layout } from "../../components";
import OverallUserStats from "./OverallUserStats";
import Table from "./Table";

export default function User() {
  return (
    <Layout>
      <section className="dashboard_main-view">
        <h1>Users</h1>

        {/* The User statistics */}
        <OverallUserStats />

        {/* The Table information */}
        <Table />
      </section>
    </Layout>
  );
}
