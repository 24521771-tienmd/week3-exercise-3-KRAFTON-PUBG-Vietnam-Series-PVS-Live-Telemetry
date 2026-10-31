import { useState } from 'react'
import PubgMatchTelemetry from './homeworks/ex3/PubgMatchTelemetry.jsx'

function App() {
  const [selectedSquadId, setSelectedSquadId] = useState('te')

  return (
    <main>
      <header>
        <h1>PUBG VN Match Telemetry</h1>
      </header>

      <PubgMatchTelemetry
        squadId={selectedSquadId}
        onSquadChange={setSelectedSquadId}
      />
    </main>
  )
}

export default App
