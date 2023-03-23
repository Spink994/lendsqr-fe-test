import { useEffect } from "react";
import { Layout, Spinner } from "../../components";
import OverallUserStats from "./OverallUserStats";
import Table from "./Table";
import { useAppContext } from "../../context/AppContext";

export default function User() {
  const context = useAppContext();

  useEffect(() => {
    context?.setUserData(context.userDataBeforeMutation);
  }, []);

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
