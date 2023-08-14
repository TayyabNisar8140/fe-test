"use client";
import { useState } from "react";
import Input from "@/components/controls/Input";
import Link from "next/link";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "@/helpers/axiosHelper";
import { useRouter } from "next/navigation";

const LoginInitialValues = {
  email: "",
  password: "",
};

const ValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required(),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <Formik
            initialValues={LoginInitialValues}
            validationSchema={ValidationSchema}
            onSubmit={async (values, actions) => {
              const { setSubmitting } = actions;
              try {
                const login = await axios.post("/auth/login", values);
                setSubmitting(false);
                localStorage.setItem("token", login.data.jwt);
                axios.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${login.data.jwt}`;
                router.push("/list-tasks");
              } catch (error: any) {
                setSubmitting(false);
                setError(error?.response?.data?.message || "server error");
              }
            }}
          >
            {({
              values,
              handleBlur,
              handleChange,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <Input
                  label="Your Email"
                  name="email"
                  type="email"
                  placeholder="example@company.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email && touched.email)}
                />
                <Input
                  label="Your Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.password && touched.password)}
                />
                {error ? (
                  <p className="text-md font-light text-red-700">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {`Don’t`} have an account yet?{" "}
                  <Link
                    href={"/register"}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
