import { Settings, BookOpen, Calendar, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Progress } from "../ui/progress"

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  batch: string
  specialization: string
  progress: {
    coursesCompleted: number
    totalCourses: number
    cgpa: number
    attendance: number
  }
}

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  const progressPercentage = (user.progress.coursesCompleted / user.progress.totalCourses) * 100

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Profile Information</CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="text-sm">
                  {user.role}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Current Batch</span>
                </div>
                <p className="text-lg font-semibold">{user.batch}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Specialization</span>
                </div>
                <p className="text-lg font-semibold">{user.specialization}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Academic Progress</CardTitle>
            <CardDescription>Your current academic performance and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {user.progress.coursesCompleted}/{user.progress.totalCourses} completed
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{user.progress.cgpa}</div>
                  <div className="text-sm text-muted-foreground">CGPA</div>
                </div>

                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{user.progress.coursesCompleted}</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>

                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{user.progress.attendance}%</div>
                  <div className="text-sm text-muted-foreground">Attendance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
