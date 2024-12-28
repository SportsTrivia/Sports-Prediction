/*
  # Create games table and voting function

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `home_team` (text)
      - `away_team` (text)
      - `date` (timestamptz)
      - `is_finished` (boolean)
      - `home_score` (integer, nullable)
      - `away_score` (integer, nullable)
      - `home_votes` (integer)
      - `away_votes` (integer)
      - `created_at` (timestamptz)

  2. Functions
    - `increment_vote`: Safely increments vote count for a team
    
  3. Security
    - Enable RLS on `games` table
    - Add policies for:
      - Anyone can read games
      - Authenticated users can vote
*/

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  home_team text NOT NULL,
  away_team text NOT NULL,
  date timestamptz NOT NULL,
  is_finished boolean NOT NULL DEFAULT false,
  home_score integer,
  away_score integer,
  home_votes integer NOT NULL DEFAULT 0,
  away_votes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read games"
  ON games
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON games
  FOR UPDATE
  TO authenticated
  USING (NOT is_finished)
  WITH CHECK (NOT is_finished);

-- Create vote increment function
CREATE OR REPLACE FUNCTION increment_vote(game_id uuid, team_vote text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF team_vote = 'home' THEN
    UPDATE games 
    SET home_votes = home_votes + 1
    WHERE id = game_id AND NOT is_finished;
  ELSIF team_vote = 'away' THEN
    UPDATE games 
    SET away_votes = away_votes + 1
    WHERE id = game_id AND NOT is_finished;
  END IF;
END;
$$;