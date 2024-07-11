import { Skeleton } from '@/components/ui/skeleton'

interface SkeletonBarChartHorizontalProps {
  bar: number
}

export default function SkeletonBarChartHorizontal({
  bar,
}: SkeletonBarChartHorizontalProps) {
  return (
    <div className=" flex items-end flex-col h-full w-full space-y-2">
      <div className="flex items-end space-x-2 w-full h-full px-8">
        {[...Array(bar)].map((_, index) => {
          const height = Math.floor(Math.random() * (250 - 35 + 1) + 35)
          return (
            <Skeleton
              key={index}
              className="w-full"
              style={{ height: `${height}px` }}
            />
          )
        })}
      </div>
      <Skeleton className="h-2 w-full px-8" />
    </div>
  )
}
