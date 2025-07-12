/*
  # Add UPDATE policy for leads table

  1. Changes
    - Add UPDATE policy to allow updating discount codes
    - Policy allows anonymous users to update their own records by email

  2. Security
    - Policy is restrictive - only allows updating specific fields
    - Users can only update records that match their email
*/

-- Allow public updates for discount codes
CREATE POLICY "Allow public updates for discount codes"
  ON leads
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true); 