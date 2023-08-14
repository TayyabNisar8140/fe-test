"use client";
import axios from "@/helpers/axiosHelper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";

const withAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthticated] = useState(false);
    let token: any;

    useEffect(() => {
      const fetchUser = async () => {
        try {
          setLoading(true);
          let user = await axios.get("/auth/user");
          setLoading(false);
          setIsAuthticated(true);
        } catch (error) {
          setLoading(false);
          router.push("/login");
        }
      };
      if (!token && router) {
        router.push("/login");
      } else {
        fetchUser();
      }
    }, [token, router]);
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (loading) {
      return (
        <div className="w-screen h-screen flex items-center justify-center text-3xl text-blue-600">
          Loading...
        </div>
      );
    }

    if (isAuthenticated) {
      console.log({ isAuthenticated }, "true is ");

      return <Component />;
    }
  };
  return AuthenticatedComponent;
};

export default withAuth;
