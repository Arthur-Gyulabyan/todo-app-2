/**
 * @file src/App.tsx
 * @description The root component of the React application.
 *              Sets up global providers (TanStack Query, Tooltip, Toast),
 *              and defines application-wide routing using `react-router-dom`.
 */

import { Toaster } from "@/components/ui/toaster"; // Shadcn/UI Toast provider
import { Toaster as Sonner } from "@/components/ui/sonner"; // Shadcn/UI Sonner provider (for optional fancy toasts)
import { TooltipProvider } from "@/components/ui/tooltip"; // Shadcn/UI Tooltip provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // TanStack Query for server state management
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router for navigation

// Import application pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage"; // Import the newly created Dashboard page

// Create a new QueryClient instance for TanStack Query
const queryClient = new QueryClient();

const App = () => (
  // Wrap the entire application with QueryClientProvider to enable TanStack Query
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider enables tooltip functionality across the app */}
    <TooltipProvider>
      {/* Toaster for standard Shadcn/UI toasts */}
      <Toaster />
      {/* Sonner for more advanced, "sonner-like" toasts */}
      <Sonner />
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Root path, redirects to Dashboard */}
          <Route path="/" element={<Index />} />
          {/* Main application dashboard route */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* Catch-all route for any undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;