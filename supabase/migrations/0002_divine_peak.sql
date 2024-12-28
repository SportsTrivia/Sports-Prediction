/*
  # Seed initial games data

  1. Data Insertion
    - Add three initial games:
      - Lakers vs Warriors (upcoming)
      - Celtics vs Nets (completed)
      - Bucks vs Heat (upcoming)
*/

INSERT INTO games (home_team, away_team, date, is_finished, home_score, away_score, home_votes, away_votes)
VALUES
  (
    'Lakers',
    'Warriors',
    NOW() + INTERVAL '1 day',
    false,
    NULL,
    NULL,
    45,
    55
  ),
  (
    'Celtics',
    'Nets',
    NOW(),
    true,
    112,
    98,
    70,
    30
  ),
  (
    'Bucks',
    'Heat',
    NOW() + INTERVAL '2 days',
    false,
    NULL,
    NULL,
    60,
    40
  );