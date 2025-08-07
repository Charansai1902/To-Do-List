import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full flex gap-3 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow p-4 input-glass rounded-2xl text-foreground placeholder-muted-foreground transition-all duration-300 outline-none text-lg font-normal"
      />
      <motion.button
        type="submit"
        className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 button-glow shadow-xl"
        disabled={!input.trim()}
        whileHover={{ 
          scale: 1.02, 
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.96 }}
        animate={input.trim() ? { 
          boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" 
        } : {}}
      >
        <Plus size={16} />
        Add
      </motion.button>
    </motion.form>
  );
}
