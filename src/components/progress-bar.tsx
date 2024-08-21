interface ProgressProps {
  progress: number
  target: number // Meta opcional
  inverted?: boolean // Propriedade opcional para indicar progresso invertido
}

export default function ProgressBar({
  progress,
  target,
  inverted = false,
}: ProgressProps) {
  const displayProgress = Math.min(progress, 100)
  const isFailing = displayProgress < 100

  const targetPosition = Math.min(target, 100)

  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative w-full h-2 flex-1 rounded-full bg-zinc-100 dark:bg-zinc-600">
        {/* Indicador da meta, mostrado apenas se inverted for true */}
        {inverted && (
          <div
            className="absolute top-0 h-2 w-1 bg-zinc-800 dark:bg-zinc-400"
            style={{
              left: `${targetPosition}%`,
            }}
          />
        )}
        {/* Barra de progresso */}
        <div
          className={`h-2 rounded-full ${isFailing ? 'bg-red-500 hover:bg-red-600' : 'bg-[#36a2eb] hover:bg-[#36a2eb]/80 dark:bg-[#4bc0c07f] hover:dark:bg-[#4bc0c07f]/80'}`}
          style={{
            width: `${displayProgress}%`,
          }}
        />
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {displayProgress}%
      </span>
    </div>
  )
}
