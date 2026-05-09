import { motion } from 'framer-motion';

export const LoadingState = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0.5 },
    show: { opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} variants={item} className="card h-32">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-neutral-200 rounded w-3/4" />
              <div className="h-6 bg-neutral-200 rounded w-1/2" />
              <div className="h-3 bg-neutral-200 rounded w-2/3" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="card h-80">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 rounded w-1/3" />
          <div className="space-y-3 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-neutral-200 rounded" />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
