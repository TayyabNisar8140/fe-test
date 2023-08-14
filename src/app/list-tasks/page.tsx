"use client";

import AddTask from "@/components/tasks/AddTask";
import TasksList from "@/components/tasks/TasksList";
import withAuth from "@/hoc/WithAuth";
import type { NextPage } from "next";

const ListTaks: NextPage = () => {
  return (
    <section className=" p-16">
      <AddTask />
      <TasksList />
    </section>
  );
};

export default withAuth(ListTaks);
