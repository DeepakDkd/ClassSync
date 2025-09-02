import { Button } from '../ui/button'

function Hero() {
  return (
    <div>  <section className="relative bg-primary text-primary-foreground py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Excellence in Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Empowering students, faculty, and administrators with a
            comprehensive platform for academic success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Explore Courses
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section></div>
  )
}

export default Hero