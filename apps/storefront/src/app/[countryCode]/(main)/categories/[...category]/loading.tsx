import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

export default function Loading() {
  return (
    <div className="relative w-full min-h-screen bg-white text-black font-sans pb-16">
      
      {/* Skeleton Submenu Bar (approximate height of CategorySubmenuBar) */}
      <div className="w-full py-4 border-b border-neutral-100 flex items-center justify-center gap-x-8 sm:gap-x-12 overflow-hidden">
         <div className="w-12 sm:w-16 h-[10px] bg-gray-200 animate-pulse" />
         <div className="w-16 sm:w-20 h-[10px] bg-gray-200 animate-pulse" />
         <div className="w-12 sm:w-16 h-[10px] bg-gray-200 animate-pulse" />
         <div className="w-20 sm:w-24 h-[10px] bg-gray-200 animate-pulse hidden sm:block" />
      </div>

      {/* Skeleton Top Header / Control Bar */}
      <div className="w-full border-b border-neutral-100 py-6 px-8 sm:px-12 flex justify-between items-center bg-white">
        <div className="flex gap-x-8 items-center">
          <div className="w-48 h-[12px] bg-gray-200 animate-pulse" />
        </div>
        <div className="hidden md:flex gap-x-4 items-center">
          <div className="w-24 h-[12px] bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Grid Container */}
      <div className="px-8 sm:px-12 py-10 max-w-[1550px] mx-auto">
        <div className="[&_ul]:!grid-cols-1 sm:[&_ul]:!grid-cols-2 md:[&_ul]:!grid-cols-3 lg:[&_ul]:!grid-cols-4 [&_ul]:!gap-x-[2px] [&_ul]:!gap-y-8">
           <SkeletonProductGrid numberOfProducts={8} />
        </div>
      </div>
    </div>
  )
}
