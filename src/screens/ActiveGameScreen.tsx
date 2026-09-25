import { useState } from 'react'
import EndGameModal from '../components/EndGameModal'
import HandHistoryList from '../components/HandHistoryList'
import HandResolutionModal from '../components/HandResolutionModal'
import Header from '../components/Header'
import PlayerBalanceCard from '../components/PlayerBalanceCard'
import { getPlayer } from '../data/players'
import { useGame } from '../context/GameContext'
import { activePlayerIds } from '../lib/gameLogic'
import type { PlayerId } from '../types'

interface ActiveGameScreenProps {
  onHome: () => void
}

export default function ActiveGameScreen({ onHome }: ActiveGameScreenProps) {
  const { activeGame, resolveHand, undoLastHand, endGameManual } = useGame()
  const [modal, setModal] = useState<'hand' | 'end' | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)

  if (!activeGame) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-white/60">Aktif bir oyun bulunamadı.</p>
        <button
          type="button"
          onClick={onHome}
          className="min-h-12 rounded-xl bg-emerald-500 px-6 font-bold text-black"
        >
          Ana Sayfa
        </button>
      </div>
    )
  }

  const activeIds = activePlayerIds(activeGame)
  const sortedIds = [...activeGame.playerIds].sort((a, b) => {
    const aBusted = (activeGame.balances[a] ?? 0) <= 0
    const bBusted = (activeGame.balances[b] ?? 0) <= 0
    if (aBusted !== bBusted) return aBusted ? 1 : -1
    return (activeGame.balances[b] ?? 0) - (activeGame.balances[a] ?? 0)
  })

  function handleConfirmHand(winnerId: PlayerId, losses: Partial<Record<PlayerId, number>>) {
    resolveHand(winnerId, losses)
    setModal(null)
  }

  function handleConfirmEnd(winnerId: PlayerId) {
    endGameManual(winnerId)
    setModal(null)
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Oyun Devam Ediyor" onBack={onHome} />
      <div className="flex-1 overflow-y-auto p-4 pb-40">
        <div className="flex flex-col gap-3">
          {sortedIds.map((id) => {
            const balance = activeGame.balances[id] ?? 0
            return (
              <PlayerBalanceCard
                key={id}
                player={getPlayer(id)}
                balance={balance}
                busted={balance <= 0}
              />
            )
          })}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setHistoryOpen((v) => !v)}
            className="mb-2 flex w-full items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm font-semibold text-white/70"
          >
            <span>Son Eller ({activeGame.hands.length})</span>
            <span>{historyOpen ? '▲' : '▼'}</span>
          </button>
          {historyOpen && <HandHistoryList hands={activeGame.hands} />}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 flex flex-col gap-2 border-t border-white/10 bg-[#0f1115]/95 p-4 backdrop-blur">
        <button
          type="button"
          onClick={() => setModal('hand')}
          disabled={activeIds.length < 2}
          className="min-h-14 w-full rounded-xl bg-emerald-500 text-base font-bold text-black disabled:opacity-30 active:scale-95"
        >
          El Bitti
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setModal('end')}
            className="min-h-12 flex-1 rounded-xl border border-red-400/40 bg-red-500/10 text-sm font-bold text-red-300 active:scale-95"
          >
            Oyunu Bitir
          </button>
          <button
            type="button"
            onClick={undoLastHand}
            disabled={activeGame.hands.length === 0}
            className="min-h-12 flex-1 rounded-xl border border-white/15 bg-white/5 text-sm font-bold text-white/70 disabled:opacity-30 active:scale-95"
          >
            Geri Al
          </button>
        </div>
      </div>

      {modal === 'hand' && (
        <HandResolutionModal
          activePlayers={activeIds.map(getPlayer)}
          onConfirm={handleConfirmHand}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === 'end' && (
        <EndGameModal
          activePlayers={activeIds.map(getPlayer)}
          onConfirm={handleConfirmEnd}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  )
}
