/*
  # Add promo code column to leads table

  1. Changes
    - Add `promo_code` column to `leads` table
    - Column is nullable since not all users will request a promo code
    - Add index for faster lookups by promo code

  2. Security
    - No changes to RLS policies needed
    - Existing policies will cover the new column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'promo_code'
  ) THEN
    ALTER TABLE leads ADD COLUMN promo_code text;
  END IF;
END $$;

-- Add index for promo code lookups
CREATE INDEX IF NOT EXISTS idx_leads_promo_code ON leads(promo_code); 