import ProtectedRoute from "@/components/ProtectedRoute";

export default function ApplicantLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
