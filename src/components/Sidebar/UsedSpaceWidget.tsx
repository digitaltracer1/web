export function UsedSpaceWidget() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-orange-50 px-4 py-5 dark:bg-zinc-800">
      <div className="space-y-1">
        <span className="text-sm/5 font-medium text-orange-700 dark:text-zinc-100">
          Used space
        </span>
        <p className="text-sm/5 text-orange-500 dark:text-zinc-400">
          Your team has used 80% of your available space. Need more?
        </p>
      </div>

      <div className="h-2 rounded-full bg-orange-100 dark:bg-zinc-600">
        <div className="h-2 w-4/5 rounded-full bg-orange-600 dark:bg-orange-400" />
      </div>

      <div className="space-x-3">
        <button
          type="button"
          className="text-sm font-medium text-orange-500 hover:text-orange-700 dark:text-orange-300 dark:hover:text-orange-200"
        >
          Dismiss
        </button>
        <button
          type="button"
          className="text-sm font-medium text-orange-700 hover:text-orange-900 dark:text-zinc-300 dark:hover:text-zinc-100"
        >
          Upgrade plan
        </button>
      </div>
    </div>
  )
}
