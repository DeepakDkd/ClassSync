import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

function Testimonials() {
  return (
    <div>
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent-foreground">
                      AS
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Anita Sharma</CardTitle>
                    <CardDescription>MCA Graduate 2023</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The comprehensive curriculum and excellent faculty helped me
                  land my dream job at a top tech company."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent-foreground">
                      RK
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Rahul Kumar</CardTitle>
                    <CardDescription>B.Tech Graduate 2022</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The practical approach to learning and industry connections
                  made all the difference in my career."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent-foreground">
                      PM
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Priya Mehta</CardTitle>
                    <CardDescription>MBA Graduate 2024</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The leadership development programs and networking
                  opportunities opened doors I never imagined."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
