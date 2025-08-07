import { motion } from 'framer-motion';
import { FilterType } from '@shared/schema';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    total: number;
    active: number;
    completed: number;
  };
}

export default function FilterButtons({ currentFilter, onFilterChange, taskCounts }: FilterButtonsProps) {
  const filters: { name: FilterType; count: number; color: string }[] = [
    { name: 'All', count: taskCounts.total, color: 'bg-blue-500' },
    { name: 'Active', count: taskCounts.active, color: 'bg-gray-500' },
    { name: 'Completed', count: taskCounts.completed, color: 'bg-green-500' },
  ];

  return (
    <motion.div 
      className="flex justify-center gap-4 my-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {filters.map((filter, index) => (
        <motion.button
          key={filter.name}
          onClick={() => onFilterChange(filter.name)}
          className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
            currentFilter === filter.name
              ? 'filter-btn-active'
              : 'glassmorphic hover:bg-white/10'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3 + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.name}
          <span className={`text-xs px-2.5 py-1 rounded-full text-white font-medium ${
            currentFilter === filter.name ? 'bg-white/20' : filter.color
          }`}>
            {filter.count}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
