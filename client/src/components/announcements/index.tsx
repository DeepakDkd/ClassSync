import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function Announcements() {
  return (
    <div>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Admissions</Badge>
                  <span className="text-sm text-muted-foreground">
                    Dec 15, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">
                  Spring 2025 Admissions Open
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Applications are now open for Spring 2025 semester. Apply
                  before January 31st.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Events</Badge>
                  <span className="text-sm text-muted-foreground">
                    Dec 10, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">Tech Symposium 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join us for our annual technology symposium featuring industry
                  leaders and innovations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Academic</Badge>
                  <span className="text-sm text-muted-foreground">
                    Dec 8, 2024
                  </span>
                </div>
                <CardTitle className="text-lg">
                  New AI & ML Specialization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Introducing new specialization tracks in Artificial
                  Intelligence and Machine Learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Announcements;
