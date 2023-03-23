import { Sidebar, DashboardHeader } from "../../components";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const non_dashboard_pages = ["/"];

export default function Layout({ children }: Props) {
  const { pathname } = window.location;

  return (
    <>
      {non_dashboard_pages.includes(pathname) ? (
        <main>{children}</main>
      ) : (
        <main className="dashboard_layout">
          <Sidebar />

          <section>
            <DashboardHeader />
            <div className="children">{children}</div>
          </section>
        </main>
      )}
    </>
  );
}
