export const WeatherCardSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-4 flex-1">
        <div className="h-20 w-32 bg-gray-200/80 rounded-lg shimmer"></div>
        <div className="h-6 w-40 bg-gray-200/80 rounded shimmer"></div>
      </div>
      <div className="h-24 w-24 bg-gray-200/80 rounded-full shimmer"></div>
    </div>
    <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-200">
      <div className="h-16 bg-gray-200/80 rounded shimmer"></div>
      <div className="h-16 bg-gray-200/80 rounded shimmer"></div>
    </div>
  </div>
);

export const SmallCardSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 animate-pulse h-full">
    <div className="space-y-4">
      <div className="h-4 w-24 bg-gray-200/80 rounded shimmer"></div>
      <div className="h-12 w-20 bg-gray-200/80 rounded-lg shimmer"></div>
      <div className="h-4 w-32 bg-gray-200/80 rounded shimmer"></div>
    </div>
  </div>
);

export const HourlyForecastSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 animate-pulse">
    <div className="h-4 w-32 bg-gray-200/80 rounded shimmer mb-4"></div>
    <div className="flex gap-4 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 min-w-[70px]">
          <div className="h-4 w-12 bg-gray-200/80 rounded shimmer"></div>
          <div className="h-12 w-12 bg-gray-200/80 rounded-full shimmer"></div>
          <div className="h-6 w-10 bg-gray-200/80 rounded shimmer"></div>
        </div>
      ))}
    </div>
    <div className="h-24 mt-4 bg-gray-200/80 rounded shimmer"></div>
  </div>
);

export const DailyForecastSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 animate-pulse">
    <div className="h-4 w-32 bg-gray-200/80 rounded shimmer mb-4"></div>
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <div className="h-4 w-20 bg-gray-200/80 rounded shimmer"></div>
          <div className="h-8 w-8 bg-gray-200/80 rounded-full shimmer"></div>
          <div className="flex gap-2 items-center flex-1 justify-end">
            <div className="h-4 w-12 bg-gray-200/80 rounded shimmer"></div>
            <div className="h-2 w-24 bg-gray-200/80 rounded shimmer"></div>
            <div className="h-4 w-12 bg-gray-200/80 rounded shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AIAlertSkeleton = () => (
  <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 bg-gray-200/80 rounded-full shimmer"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 w-32 bg-gray-200/80 rounded shimmer"></div>
        <div className="h-4 w-full bg-gray-200/80 rounded shimmer"></div>
        <div className="h-4 w-3/4 bg-gray-200/80 rounded shimmer"></div>
      </div>
    </div>
  </div>
);
