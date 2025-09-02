/**
 * @file src/pages/Index.tsx
 * @description The root page of the application, responsible for redirecting
 *              to the main dashboard.
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Import a spinner icon

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect from the root path ("/") to the dashboard route ("/dashboard").
    // `replace: true` ensures that the user cannot go back to the empty root path using the browser's back button.
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Redirecting to Dashboard...</p>
      </div>
    </div>
  );
};

export default Index;