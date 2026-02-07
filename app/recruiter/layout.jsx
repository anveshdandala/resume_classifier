import ProtectedRoute from "@/components/ProtectedRoute";

export default function RecruiterLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
