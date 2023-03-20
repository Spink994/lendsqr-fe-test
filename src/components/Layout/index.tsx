import { Sidebar } from "../../components";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="dashboard_layout">
      <Sidebar />

      <section>
        <div>Top Navigation</div>
        <div>{children}</div>
      </section>
    </main>
  );
}
