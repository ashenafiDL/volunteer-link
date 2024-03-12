const LoadingIndicator = () => {
  return (
    <div className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex h-56 w-56 items-center justify-center rounded-lg border">
      <div className="text-blue-800 bg-blue-200 dark:bg-blue-900 dark:text-blue-200 animate-pulse rounded-full px-3 py-1 text-center text-xs font-medium leading-none">
        loading...
      </div>
    </div>
  );
};

export default LoadingIndicator;
