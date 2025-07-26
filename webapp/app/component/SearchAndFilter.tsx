import { Filter, Search } from "lucide-react";

// Search and Filter Component
type SearchAndFilterProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string | number;
  setSelectedCategory: (value: string) => void;
  categories: (string | number)[];
};

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}: SearchAndFilterProps) => {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Search and Filter Container */}
        <div className="max-w-8xl mx-auto">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-pink-100 p-8">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Search Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search
                    className="h-5 w-5 text-pink-400 group-focus-within:text-pink-600 transition-colors duration-200"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for beauty services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-pink-100 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none bg-white/90 backdrop-blur-sm text-gray-700 placeholder-pink-300 transition-all duration-300 hover:border-pink-200 hover:shadow-lg"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-pink-600 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Filter Dropdown */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Filter
                    className="h-5 w-5 text-pink-400 group-focus-within:text-pink-600 transition-colors duration-200"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 border-2 border-pink-100 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none bg-white/90 backdrop-blur-sm appearance-none cursor-pointer text-gray-700 transition-all duration-300 hover:border-pink-200 hover:shadow-lg"
                >
                  <option value="" className="text-pink-300">All Categories</option>
                  {categories
                    .filter((category: any) => typeof category === 'string' || typeof category === 'number')
                    .map((category: string | number) => (
                      <option key={category} value={category} className="text-gray-700">
                        {category}
                      </option>
                    ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400 group-focus-within:text-pink-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-pink-600 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter;