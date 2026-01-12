import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface SearchResult {
  id: string;
  title: string;
  type: 'food' | 'product' | 'blog';
  link: string;
}

interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
  showInHeader?: boolean;
}

const GlobalSearch = ({ className = '', placeholder = 'Search foods, products, blogs...', showInHeader = false }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const searchPattern = `%${searchQuery}%`;
      
      // Search food products
      const { data: products } = await supabase
        .from('food_products')
        .select('id, name')
        .ilike('name', searchPattern)
        .limit(5);

      // Search foods (food_timing)
      const { data: foods } = await supabase
        .from('food_timing')
        .select('id, name')
        .ilike('name', searchPattern)
        .limit(5);

      // Search blogs
      const { data: blogs } = await supabase
        .from('blogs')
        .select('id, title')
        .eq('status', 'published')
        .ilike('title', searchPattern)
        .limit(5);

      const combinedResults: SearchResult[] = [
        ...(products || []).map(p => ({ id: p.id, title: p.name, type: 'product' as const, link: `/food-products/${p.id}` })),
        ...(foods || []).map(f => ({ id: f.id, title: f.name, type: 'food' as const, link: `/foods/${f.id}` })),
        ...(blogs || []).map(b => ({ id: b.id, title: b.title, type: 'blog' as const, link: `/blog/${b.id}` })),
      ];

      setResults(combinedResults);
      setIsOpen(combinedResults.length > 0);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (link: string) => {
    navigate(link);
    setQuery('');
    setIsOpen(false);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'product': return 'Product';
      case 'food': return 'Food';
      case 'blog': return 'Blog';
      default: return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-green-100 text-green-700';
      case 'food': return 'bg-orange-100 text-orange-700';
      case 'blog': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          className={`pl-10 pr-10 ${showInHeader ? 'h-9 text-sm' : ''}`}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result.link)}
              className="w-full px-4 py-3 text-left hover:bg-accent flex items-center justify-between border-b border-border/50 last:border-0 transition-colors"
            >
              <span className="text-sm font-medium text-foreground truncate flex-1 mr-3">
                {result.title}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${getTypeColor(result.type)}`}>
                {getTypeLabel(result.type)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
