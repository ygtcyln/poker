import type { CompletedGame, GameState } from '../types'

const ACTIVE_GAME_KEY = 'poker.activeGame.v1'
const HISTORY_KEY = 'poker.history.v1'

export function loadActiveGame(): GameState | null {
  try {
    const raw = localStorage.getItem(ACTIVE_GAME_KEY)
    if (!raw) return null
    return JSON.parse(raw) as GameState
  } catch {
    return null
  }
}

export function saveActiveGame(state: GameState | null): void {
  try {
    if (state === null) {
      localStorage.removeItem(ACTIVE_GAME_KEY)
    } else {
      localStorage.setItem(ACTIVE_GAME_KEY, JSON.stringify(state))
    }
  } catch {
    // localStorage kullanılamıyorsa (gizli mod vb.) sessizce yok say
  }
}

export function clearActiveGame(): void {
  saveActiveGame(null)
}

export function loadHistory(): CompletedGame[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as CompletedGame[]) : []
  } catch {
    return []
  }
}

export function saveHistory(history: CompletedGame[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    // yoksay
  }
}

export function appendCompletedGame(game: CompletedGame): void {
  const history = loadHistory()
  history.push(game)
  saveHistory(history)
}

export function removeCompletedGame(id: string): void {
  const history = loadHistory().filter((g) => g.id !== id)
  saveHistory(history)
}
