import { Sidebar, DashboardHeader } from "../../components";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="dashboard_layout">
      <Sidebar />

      <section>
        <DashboardHeader />
        <div>{children}</div>
      </section>
    </main>
  );
}
