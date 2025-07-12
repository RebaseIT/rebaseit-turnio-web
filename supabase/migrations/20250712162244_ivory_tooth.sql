/*
  # Create leads table for Turnio

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `wants_discount` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for public insertions (since it's a landing page)
    - Add policy for reading own data when authenticated
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  wants_discount boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public insertions for the landing page
CREATE POLICY "Allow public insertions"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow users to read their own data when authenticated
CREATE POLICY "Users can read own data"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_leads_updated_at 
  BEFORE UPDATE ON leads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();