export const PUBG_VN_SQUADS = Object.freeze([
  Object.freeze({
    id: 'ces',
    name: 'Cerberus Esports',
  }),
  Object.freeze({
    id: 'te',
    name: 'The Expendables',
  }),
  Object.freeze({
    id: 'ge',
    name: 'Genius Esports',
  }),
])
const MOCK_TELEMETRY = Object.freeze({
  ces: Object.freeze({
    matchesPlayed: 12,
    wins: 3,
    kills: 85,
    placementPoints: 96,
  }),
  te: Object.freeze({
    matchesPlayed: 12,
    wins: 2,
    kills: 78,
    placementPoints: 88,
  }),
  ge: Object.freeze({
    matchesPlayed: 12,
    wins: 1,
    kills: 69,
    placementPoints: 81,
  }),
})

/**
 * Simulates fetching PUBG VN squad telemetry.
 *
 * @param {'ces' | 'te' | 'ge'} squadId
 * @param {{ signal: AbortSignal }} options
 * @returns {Promise<object>}
 */
export function fetchKraftonPubgTelemetry(squadId, { signal }) {
  return new Promise((resolve, reject) => {
    const squad = PUBG_VN_SQUADS.find(
      (item) => item.id === squadId,
    )

    if (!squad) {
      reject(new Error(`Unknown squad: ${squadId}`))
      return
    }

    if (signal.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'))
      return
    }

    const timeoutId = setTimeout(() => {
      signal.removeEventListener('abort', handleAbort)

      if (Math.random() < 0.35) {
        reject(new Error('Satellite packet lost'))
        return
      }

      resolve({
        ...squad,
        ...MOCK_TELEMETRY[squadId],
      })
    }, 800)

    function handleAbort() {
      clearTimeout(timeoutId)
      signal.removeEventListener('abort', handleAbort)

      reject(new DOMException('Request aborted', 'AbortError'))
    }

    signal.addEventListener('abort', handleAbort, { once: true })
  })
}