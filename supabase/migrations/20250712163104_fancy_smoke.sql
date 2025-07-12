/*
  # Fix RLS policy for leads table

  1. Security Updates
    - Add policy for anonymous users to insert leads
    - Allow public insertions for email capture
    - Maintain read access for authenticated users

  This fixes the "new row violates row-level security policy" error
  by allowing anonymous users to insert their email addresses.
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public insertions" ON leads;
DROP POLICY IF EXISTS "Users can read own data" ON leads;

-- Create policy to allow anonymous users to insert leads
CREATE POLICY "Allow public insertions"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read data
CREATE POLICY "Users can read own data"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);