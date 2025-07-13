
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="animate-slide-up">
          <div className="w-24 h-24 bg-skillup-gradient rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Zap className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-skillup-gradient bg-clip-text text-transparent">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="skillup-button inline-flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 font-medium inline-flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
