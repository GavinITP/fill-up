const SkeletonCard = () => {
  return (
    <div className="mx-auto w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
      <div className="animate-pulse space-y-4">
        <div className="h-32 rounded-md bg-gray-300"></div>

        <div className="h-6 w-3/4 rounded bg-gray-300"></div>

        <div className="h-4 w-1/2 rounded bg-gray-300"></div>

        <div className="h-10 w-1/3 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
