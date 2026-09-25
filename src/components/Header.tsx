import { LuArrowLeft } from 'react-icons/lu'

interface HeaderProps {
  title: string
  onBack?: () => void
  right?: React.ReactNode
}

export default function Header({ title, onBack, right }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-white/10 bg-[#0f1115]/95 px-4 py-3 backdrop-blur">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Geri"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 active:bg-white/10"
        >
          <LuArrowLeft className="h-5 w-5" />
        </button>
      ) : (
        <span className="w-10 shrink-0" />
      )}
      <h1 className="flex-1 truncate text-center text-lg font-bold">{title}</h1>
      <div className="flex w-10 shrink-0 justify-end">{right}</div>
    </header>
  )
}
