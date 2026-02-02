import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUpDown } from 'lucide-react';
import { DateFilter, SortOption, SleepQuality } from './types';

interface SleepFiltersProps {
  dateFilter: DateFilter;
  sortOption: SortOption;
  qualityFilter: SleepQuality | 'all';
  onDateFilterChange: (filter: DateFilter) => void;
  onSortChange: (sort: SortOption) => void;
  onQualityFilterChange: (quality: SleepQuality | 'all') => void;
  onReset: () => void;
}

const SleepFilters: React.FC<SleepFiltersProps> = ({
  dateFilter,
  sortOption,
  qualityFilter,
  onDateFilterChange,
  onSortChange,
  onQualityFilterChange,
  onReset,
}) => {
  const hasFilters = dateFilter !== 'all' || sortOption !== 'date_desc' || qualityFilter !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">Filters:</span>
      </div>
      
      <Select value={dateFilter} onValueChange={(v: DateFilter) => onDateFilterChange(v)}>
        <SelectTrigger className="w-[120px] h-8 text-sm">
          <SelectValue placeholder="Date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="7days">Last 7 Days</SelectItem>
          <SelectItem value="30days">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>

      <Select value={qualityFilter} onValueChange={(v: SleepQuality | 'all') => onQualityFilterChange(v)}>
        <SelectTrigger className="w-[120px] h-8 text-sm">
          <SelectValue placeholder="Quality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Quality</SelectItem>
          <SelectItem value="poor">😴 Poor</SelectItem>
          <SelectItem value="average">😐 Average</SelectItem>
          <SelectItem value="good">🙂 Good</SelectItem>
          <SelectItem value="excellent">😊 Excellent</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOption} onValueChange={(v: SortOption) => onSortChange(v)}>
        <SelectTrigger className="w-[140px] h-8 text-sm">
          <ArrowUpDown className="w-3 h-3 mr-1" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date_desc">Date (Newest)</SelectItem>
          <SelectItem value="date_asc">Date (Oldest)</SelectItem>
          <SelectItem value="duration_desc">Duration (Most)</SelectItem>
          <SelectItem value="duration_asc">Duration (Least)</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-sm">
          Reset
        </Button>
      )}
    </div>
  );
};

export default SleepFilters;
