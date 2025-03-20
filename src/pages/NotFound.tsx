
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="glass rounded-xl p-8 max-w-md w-full text-center animate-scale-in">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! This page doesn't exist</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Button asChild className="hover-lift px-8 py-6 h-auto text-lg">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
