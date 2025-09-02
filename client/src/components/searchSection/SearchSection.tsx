import { Search } from "lucide-react";
import { Input } from "../ui/input";

function SearchSection() {
  return (
    <div>
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for courses, students, or faculty..."
              className="pl-12 h-14 text-lg bg-background border-2 focus:border-primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default SearchSection;
