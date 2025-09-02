function StatisticsSection() {
  return (
    <div>
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                15,000+
              </div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                25,000+
              </div>
              <div className="text-muted-foreground">Alumni</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StatisticsSection;
