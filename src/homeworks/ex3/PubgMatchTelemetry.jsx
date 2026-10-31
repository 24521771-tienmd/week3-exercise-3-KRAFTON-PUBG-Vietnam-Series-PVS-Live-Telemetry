import { useEffect, useState } from "react";
import { fetchKraftonPubgTelemetry, PUBG_VN_SQUADS } from "./pubg-telemetry.js";

export default function PubgMatchTelemetry({ squadId = "te", onSquadChange }) {
  const [view, setView] = useState({
    status: "LOADING",
    data: null,
    error: null,
    squadId,
    retryTick: 0,
  });

  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchKraftonPubgTelemetry(squadId, {
      signal: controller.signal,
    })
      .then((data) => {
        setView({
          status: "SUCCESS",
          data,
          error: null,
          squadId,
          retryTick,
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        setView({
          status: "ERROR",
          data: null,
          error,
          squadId,
          retryTick,
        });
      });

    return () => {
      controller.abort();
    };
  }, [squadId, retryTick]);

    const displayStatus =
    view.squadId === squadId && view.retryTick === retryTick
      ? view.status
      : 'LOADING'

  return (
    <section>
      <nav aria-label="Select PUBG VN squad">
        {PUBG_VN_SQUADS.map((squad) => (
          <button
            key={squad.id}
            type="button"
            aria-pressed={squadId === squad.id}
            onClick={() => onSquadChange?.(squad.id)}
          >
            {squad.id.toUpperCase()}
          </button>
        ))}
      </nav>

      {displayStatus === "LOADING" && (
        <div
          className="telemetry-skeleton"
          aria-busy="true"
          aria-label="Loading squad telemetry"
        >
          <div className="skeleton-title" />
          <div className="skeleton-metrics">
            <div className="skeleton-metric" />
            <div className="skeleton-metric" />
            <div className="skeleton-metric" />
            <div className="skeleton-metric" />
          </div>
        </div>
      )}

      {displayStatus === "SUCCESS" && view.data && (
        <article className="telemetry-card" aria-live="polite">
          <h2>{view.data.name}</h2>

          <dl>
            <div>
              <dt>Matches Played</dt>
              <dd>{view.data.matchesPlayed}</dd>
            </div>

            <div>
              <dt>Wins</dt>
              <dd>{view.data.wins}</dd>
            </div>

            <div>
              <dt>Kills</dt>
              <dd>{view.data.kills}</dd>
            </div>

            <div>
              <dt>Placement Points</dt>
              <dd>{view.data.placementPoints}</dd>
            </div>
          </dl>
        </article>
      )}

            {displayStatus === 'ERROR' && (
        <section role="alert" className="telemetry-error">
          <h2>Satellite Connection Lost</h2>

          <p>
            {view.error?.message || 'Unable to retrieve telemetry.'}
          </p>

          <button
            type="button"
            onClick={() => setRetryTick((current) => current + 1)}
          >
            Reconnect Satellite
          </button>
        </section>
      )}
    </section>
  );
}
