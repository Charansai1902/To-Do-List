import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { Task, FilterType } from '@shared/schema';
import TaskItem from './task-item';

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, newText: string) => void;
}

export default function TaskList({ tasks, filter, onToggleComplete, onDeleteTask, onUpdateTask }: TaskListProps) {
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'Active':
        return !task.completed;
      case 'Completed':
        return task.completed;
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    return (
      <motion.div 
        className="text-center text-muted-foreground py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ClipboardList className="mx-auto mb-6 opacity-40" size={64} />
        <p className="text-xl mb-3 font-medium">No tasks yet</p>
        <p className="text-base opacity-70">Just Doo it! ✨</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
