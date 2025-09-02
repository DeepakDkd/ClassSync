import Hero from "../components/heroSection/Hero";
import QuickAccess from "../components/quickAccess/QuickAccess";
import SearchSection from "../components/searchSection/SearchSection";
import StatisticsSection from "../components/statisticsSection";
import Announcements from "../components/announcements";
import Testimonials from "../components/testimonials";
import { GraduationCap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {  useState } from "react";
import { UserProfile } from "../components/userProfile";
import { AuthModal } from "../components/authModel";

export default function HomePage() {
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)

  const handleLogin = (userData: any) => {
    setUser(userData)
  }
  const handleLogout = () => {
    setUser(null)
    setShowProfile(false)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
  }

  
  if (showProfile && user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowProfile(false)}>
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-primary">EduPlatform</span>
                </div>
                <div className="hidden md:flex space-x-6">
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    Home
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Courses
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Batches
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Admissions
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setShowProfile(false)}>
                  Back to Home
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
                <Avatar className="h-8 w-8 cursor-pointer" onClick={toggleProfile}>
                  <AvatarFallback className="text-sm font-semibold bg-primary text-primary-foreground">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </nav>

        <UserProfile user={user} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
        <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">EduPlatform</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  Home
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Batches
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Admissions
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button variant="outline" size="sm" onClick={toggleProfile}>
                    Profile
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                  <Avatar className="h-8 w-8 cursor-pointer" onClick={toggleProfile}>
                    <AvatarFallback className="text-sm font-semibold bg-primary text-primary-foreground">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Hero />

      <SearchSection />

      <QuickAccess />

      <StatisticsSection />

      <Announcements />

      <Testimonials />
       <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
    </div>
  );
}
