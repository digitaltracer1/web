interface ProgressProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-600">
        <div
          className="h-2 rounded-full bg-[#36a2eb] hover:bg-[#36a2eb]/80  dark:bg-[#4bc0c07f] hover:dark:bg-[#4bc0c07f]/80 "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {progress}%
      </span>
    </div>
  )
}
