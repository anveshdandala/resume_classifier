"use client";
import { useAuth } from "@/components/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
  if (!loading) {
    
    if (pathname.startsWith("/auth")) return;

    if (!user) {
      router.replace("/auth/login");
    } else {
      if (pathname.startsWith("/recruiter") && user.role !== "RECRUITER") {
        router.replace("/auth/login");
      } else if (
        pathname.startsWith("/applicant") &&
        user.role !== "APPLICANT"
      ) {
        router.replace("/auth/login");
      }
    }
  }
}, [user, loading, router, pathname]);

  if (loading || !user) {
    return <p>Checking authentication...</p>;
  }

  return children;
}
