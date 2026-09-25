import { useEffect, useState } from 'react'
import { GameProvider, useGame } from './context/GameContext'
import ActiveGameScreen from './screens/ActiveGameScreen'
import BuyInScreen from './screens/BuyInScreen'
import DashboardScreen from './screens/DashboardScreen'
import GameSummaryScreen from './screens/GameSummaryScreen'
import HomeScreen from './screens/HomeScreen'
import PlayerSelectScreen from './screens/PlayerSelectScreen'
import type { PlayerId } from './types'

type Screen = 'home' | 'playerSelect' | 'buyIn' | 'active' | 'summary' | 'dashboard'

function AppInner() {
  const { lastCompletedGame, startGame } = useGame()
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<PlayerId[]>([])

  useEffect(() => {
    if (lastCompletedGame) setScreen('summary')
  }, [lastCompletedGame])

  switch (screen) {
    case 'home':
      return (
        <HomeScreen
          onNewGame={() => setScreen('playerSelect')}
          onDashboard={() => setScreen('dashboard')}
          onResumeGame={() => setScreen('active')}
        />
      )
    case 'playerSelect':
      return (
        <PlayerSelectScreen
          onBack={() => setScreen('home')}
          onContinue={(ids) => {
            setSelectedPlayerIds(ids)
            setScreen('buyIn')
          }}
        />
      )
    case 'buyIn':
      return (
        <BuyInScreen
          playerIds={selectedPlayerIds}
          onBack={() => setScreen('playerSelect')}
          onStart={(buyIn) => {
            startGame(selectedPlayerIds, buyIn)
            setScreen('active')
          }}
        />
      )
    case 'active':
      return <ActiveGameScreen onHome={() => setScreen('home')} />
    case 'summary':
      return (
        <GameSummaryScreen
          onHome={() => setScreen('home')}
          onDashboard={() => setScreen('dashboard')}
        />
      )
    case 'dashboard':
      return <DashboardScreen onBack={() => setScreen('home')} />
    default:
      return null
  }
}

function App() {
  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  )
}

export default App
