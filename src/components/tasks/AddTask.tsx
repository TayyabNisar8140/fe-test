'use client'
import Input from "../controls/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "@/helpers/axiosHelper";
import { useSWRConfig } from "swr";

export default function AddTask() {
  const { mutate } = useSWRConfig();

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={Yup.object().shape({ name: Yup.string().required() })}
      onSubmit={async (values, actions) => {
        try {
          let task = await axios.post("/tasks/create-task", values);
          mutate("/tasks/list-tasks");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-12 space-x-5 p-3 bg-gray-300 rounded-md "
        >
          <Input
            type="text"
            name="name"
            placeholder="Enter your task"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.name && touched.name)}
            className=" col-span-10"
          />

          <button
            type="submit"
            className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center col-span-2"
          >
            Add Task
          </button>
        </form>
      )}
    </Formik>
  );
}
