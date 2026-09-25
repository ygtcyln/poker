import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  buildCompletedGame,
  createGame,
  endGameManual as endGameManualLogic,
  resolveHand as resolveHandLogic,
  undoLastHand as undoLastHandLogic,
} from '../lib/gameLogic'
import {
  appendCompletedGame,
  clearActiveGame,
  loadActiveGame,
  loadHistory,
  saveActiveGame,
} from '../lib/storage'
import type { CompletedGame, GameState, PlayerId } from '../types'

interface GameContextValue {
  activeGame: GameState | null
  history: CompletedGame[]
  lastCompletedGame: CompletedGame | null
  startGame: (playerIds: PlayerId[], buyIn: number) => void
  resolveHand: (winnerId: PlayerId, losses: Partial<Record<PlayerId, number>>) => void
  undoLastHand: () => void
  endGameManual: (winnerId: PlayerId) => void
  abandonGame: () => void
  clearSummary: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [activeGame, setActiveGame] = useState<GameState | null>(() => loadActiveGame())
  const [history, setHistory] = useState<CompletedGame[]>(() => loadHistory())
  const [lastCompletedGame, setLastCompletedGame] = useState<CompletedGame | null>(null)

  useEffect(() => {
    saveActiveGame(activeGame)
  }, [activeGame])

  const finishGame = useCallback((finished: GameState) => {
    const completed = buildCompletedGame(finished)
    appendCompletedGame(completed)
    setHistory((prev) => [...prev, completed])
    setLastCompletedGame(completed)
    setActiveGame(null)
    clearActiveGame()
  }, [])

  const startGame = useCallback((playerIds: PlayerId[], buyIn: number) => {
    setLastCompletedGame(null)
    setActiveGame(createGame(playerIds, buyIn))
  }, [])

  const resolveHand = useCallback(
    (winnerId: PlayerId, losses: Partial<Record<PlayerId, number>>) => {
      setActiveGame((prev) => {
        if (!prev) return prev
        const next = resolveHandLogic(prev, winnerId, losses)
        if (next.status === 'completed') {
          finishGame(next)
          return null
        }
        return next
      })
    },
    [finishGame],
  )

  const undoLastHand = useCallback(() => {
    setActiveGame((prev) => (prev ? undoLastHandLogic(prev) : prev))
  }, [])

  const endGameManual = useCallback(
    (winnerId: PlayerId) => {
      setActiveGame((prev) => {
        if (!prev) return prev
        const next = endGameManualLogic(prev, winnerId)
        finishGame(next)
        return null
      })
    },
    [finishGame],
  )

  const abandonGame = useCallback(() => {
    setActiveGame(null)
    clearActiveGame()
  }, [])

  const clearSummary = useCallback(() => {
    setLastCompletedGame(null)
  }, [])

  const value = useMemo<GameContextValue>(
    () => ({
      activeGame,
      history,
      lastCompletedGame,
      startGame,
      resolveHand,
      undoLastHand,
      endGameManual,
      abandonGame,
      clearSummary,
    }),
    [
      activeGame,
      history,
      lastCompletedGame,
      startGame,
      resolveHand,
      undoLastHand,
      endGameManual,
      abandonGame,
      clearSummary,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
