import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, Calendar, Users } from "lucide-react";
import { Badge } from "../ui/badge";

function QuickAccess() {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <BookOpen className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Courses</CardTitle>
                <CardDescription>
                  Browse MCA, B.Tech, MBA and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">MCA</Badge>
                  <Badge variant="secondary">B.Tech</Badge>
                  <Badge variant="secondary">MBA</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <Calendar className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Batches</CardTitle>
                <CardDescription>
                  View current and upcoming batches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">2023-2025</Badge>
                  <Badge variant="secondary">2024-2026</Badge>
                  <Badge variant="secondary">2025-2027</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Students & Faculty</CardTitle>
                <CardDescription>
                  Connect with the academic community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-sm text-muted-foreground">
                  Access student and faculty directories
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuickAccess;
