import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2 } from 'lucide-react';
import { Task } from '@shared/schema';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, newText: string) => void;
}

export default function TaskItem({ task, onToggleComplete, onDeleteTask, onUpdateTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdateTask(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      className="flex items-center gap-4 p-5 glassmorphic rounded-2xl shadow-xl group transition-all duration-300"
      exit={{ 
        opacity: 0, 
        x: -100, 
        scale: 0.95,
        transition: { 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        } 
      }}
      layout
      whileHover={{ 
        scale: 1.02, 
        y: -3,
        transition: { duration: 0.2 }
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="checkbox-custom"
      />
      
      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyPress}
            className="w-full bg-transparent focus:outline-none text-foreground border-b-2 border-primary font-normal text-lg"
            autoFocus
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className={`cursor-pointer transition-colors text-lg font-normal leading-relaxed ${
              task.completed 
                ? 'task-completed' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      <AnimatePresence>
        <motion.div 
          className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <motion.button
            onClick={() => setIsEditing(true)}
            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit3 size={18} />
          </motion.button>
          <motion.button
            onClick={() => onDeleteTask(task.id)}
            className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={18} />
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
