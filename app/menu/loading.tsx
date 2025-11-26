export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] pb-20">
      {/* Header Skeleton */}
      <div className="w-full h-48 bg-gray-300 animate-pulse rounded-b-[2rem]"></div>

      <div className="max-w-md mx-auto px-4 mt-8 space-y-12">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-6">
            {/* Category Title Skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-[1px] flex-1 bg-gray-200"></div>
            </div>

            {/* Product Skeletons */}
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e0d8] flex gap-4 items-start"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
