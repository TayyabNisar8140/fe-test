"use client";
import Checkbox from "../controls/Checkbox";
import axios from "@/helpers/axiosHelper";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";

const fetchTasks = () =>
  axios.get("/tasks/list-tasks").then((res) => {
    if (res.status == 200) {
      return res.data;
    } else {
      throw new Error("Something went wrong with the request");
    }
  });

export default function TasksList() {
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR("/tasks/list-tasks", fetchTasks);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleSelectTask = (checked: boolean, id: string) => {
    if (checked) setSelectedTasks([...selectedTasks, id]);
    else setSelectedTasks(selectedTasks.filter((task: string) => task != id));
  };

  const handleDeleteSelected = async () => {
    try {
      let deletedTaks = await axios.post("/tasks/delete", {
        tasks: selectedTasks,
      });
      mutate("/tasks/list-tasks");
      setSelectedTasks([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Tasks
        </h1>
        {selectedTasks.length > 0 && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleDeleteSelected}
              className=" bg-red-500 text-white px-5 py-2 rounded-md"
            >
              Delete Selected
            </button>
            <p className=" font-semibold">
              {selectedTasks.length} tasks selected
            </p>
          </div>
        )}
      </div>
      <div>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <p className="text-lg text-red-600 font-bold">{error?.message}</p>
        ) : (
          data.tasks.map((task: any) => {
            return (
              <div
                key={task._id}
                className="w-full p-5 my-3 flex items-center space-x-4 shadow"
              >
                <Checkbox
                  key={task._id}
                  id={task._id}
                  checked={selectedTasks.includes(task._id)}
                  onChange={(e) => handleSelectTask(e.target.checked, task._id)}
                />
                <p className=" text-lg font-medium">{task.name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
