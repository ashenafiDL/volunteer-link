const LoadingSkeleton = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div
      role="status"
      className="border-gray-200 divide-gray-200 dark:divide-gray-700 dark:border-gray-700 max-w-md animate-pulse space-y-4 divide-y rounded border p-4 shadow md:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="bg-gray-300 dark:bg-gray-600 mb-2.5 h-2.5 w-24 rounded-full"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-2 w-32 rounded-full"></div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-2.5 w-12 rounded-full"></div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="bg-gray-300 dark:bg-gray-600 mb-2.5 h-2.5 w-24 rounded-full"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-2 w-32 rounded-full"></div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-2.5 w-12 rounded-full"></div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="bg-gray-300 dark:bg-gray-600 mb-2.5 h-2.5 w-24 rounded-full"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-2 w-32 rounded-full"></div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-2.5 w-12 rounded-full"></div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="bg-gray-300 dark:bg-gray-600 mb-2.5 h-2.5 w-24 rounded-full"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-2 w-32 rounded-full"></div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-2.5 w-12 rounded-full"></div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="bg-gray-300 dark:bg-gray-600 mb-2.5 h-2.5 w-24 rounded-full"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-2 w-32 rounded-full"></div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-2.5 w-12 rounded-full"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSkeleton;
