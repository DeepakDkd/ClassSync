import { Button } from "../ui/button";
import { GraduationCap } from "lucide-react";

function Header() {
  return (
    <div>
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">
                  {/* EduPlatform */}ClassSync
                </span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a
                  href="#"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Courses
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Batches
                </a>
                {/* <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admissions
                </a> */}
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
