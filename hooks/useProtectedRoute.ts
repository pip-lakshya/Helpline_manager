import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function useProtectedRoute() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("../(public)/login");
    }
  }, [user, loading]);

  return { user, loading };
}