/*
  # Create lottery results table

  1. New Tables
    - `lottery_results`
      - `id` (uuid, primary key)
      - `name` (text)
      - `numbers` (text)
      - `date` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `lottery_results` table
    - Add policy for authenticated users to read results
    - Add policy for service role to insert/update results
*/

CREATE TABLE IF NOT EXISTS lottery_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  numbers text NOT NULL,
  date text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, date)
);

ALTER TABLE lottery_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read lottery results"
  ON lottery_results
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only service role can insert/update results"
  ON lottery_results
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);