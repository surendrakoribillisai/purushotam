-- Run this in Supabase SQL Editor after your existing portifolio table

-- Add JSON data column
ALTER TABLE public.portifolio
ADD COLUMN IF NOT EXISTS data jsonb;

-- Enable Row Level Security
ALTER TABLE public.portifolio ENABLE ROW LEVEL SECURITY;

-- Remove old policies if they exist
DROP POLICY IF EXISTS "portifolio_public_read" ON public.portifolio;
DROP POLICY IF EXISTS "portifolio_public_insert" ON public.portifolio;
DROP POLICY IF EXISTS "portifolio_public_update" ON public.portifolio;

-- Allow public read
CREATE POLICY "portifolio_public_read"
ON public.portifolio
FOR SELECT
TO anon
USING (id = 1);

-- Allow public insert
CREATE POLICY "portifolio_public_insert"
ON public.portifolio
FOR INSERT
TO anon
WITH CHECK (id = 1);

-- Allow public update
CREATE POLICY "portifolio_public_update"
ON public.portifolio
FOR UPDATE
TO anon
USING (id = 1)
WITH CHECK (id = 1);
