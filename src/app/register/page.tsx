"use client";
import { useState } from "react";
import Input from "@/components/controls/Input";
import Link from "next/link";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "@/helpers/axiosHelper";
import { useRouter } from "next/navigation";

const SignUpInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign up to new account
          </h1>
          <Formik
            initialValues={SignUpInitialValues}
            validationSchema={ValidationSchema}
            onSubmit={async (values, actions) => {
              console.log("values", values);
              const { setSubmitting } = actions;
              try {
                const registeration = await axios.post(
                  "/auth/register",
                  values
                );
                setSubmitting(false);
                router.push("/login")
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
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(
                    errors.confirmPassword && touched.confirmPassword
                  )}
                />
                {error ? (
                  <p className="text-sm font-light text-red-700">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  have an account?{" "}
                  <Link
                    href={"/login"}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign in
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
