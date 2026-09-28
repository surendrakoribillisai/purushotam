-- Run this in Supabase SQL Editor after your existing portfolio table from Step 2.
-- It stores the complete Admin editor data as JSON in one row.

ALTER TABLE public.portfolio
ADD COLUMN IF NOT EXISTS data jsonb;

ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "portfolio_public_read" ON public.portfolio;
DROP POLICY IF EXISTS "portfolio_public_insert" ON public.portfolio;
DROP POLICY IF EXISTS "portfolio_public_update" ON public.portfolio;

CREATE POLICY "portfolio_public_read"
ON public.portfolio FOR SELECT
TO anon
USING (id = 1);

CREATE POLICY "portfolio_public_insert"
ON public.portfolio FOR INSERT
TO anon
WITH CHECK (id = 1);

CREATE POLICY "portfolio_public_update"
ON public.portfolio FOR UPDATE
TO anon
USING (id = 1)
WITH CHECK (id = 1);

-- The Admin page will create/update row id=1 when you click Save Changes.
