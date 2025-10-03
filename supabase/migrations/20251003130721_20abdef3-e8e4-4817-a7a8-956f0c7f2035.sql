-- Loosen RLS for admin UI (temporary): allow public CUD on selected tables

-- food_products policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='food_products' AND policyname='Public can update food_products'
  ) THEN
    CREATE POLICY "Public can update food_products" ON public.food_products FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='food_products' AND policyname='Public can insert food_products'
  ) THEN
    CREATE POLICY "Public can insert food_products" ON public.food_products FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='food_products' AND policyname='Public can delete food_products'
  ) THEN
    CREATE POLICY "Public can delete food_products" ON public.food_products FOR DELETE USING (true);
  END IF;
END $$;

-- food_timing policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='food_timing' AND policyname='Public can update food_timing'
  ) THEN
    CREATE POLICY "Public can update food_timing" ON public.food_timing FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='food_timing' AND policyname='Public can insert food_timing'
  ) THEN
    CREATE POLICY "Public can insert food_timing" ON public.food_timing FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='food_timing' AND policyname='Public can delete food_timing'
  ) THEN
    CREATE POLICY "Public can delete food_timing" ON public.food_timing FOR DELETE USING (true);
  END IF;
END $$;

-- disease_foods policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='disease_foods' AND policyname='Public can update disease_foods'
  ) THEN
    CREATE POLICY "Public can update disease_foods" ON public.disease_foods FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='disease_foods' AND policyname='Public can insert disease_foods'
  ) THEN
    CREATE POLICY "Public can insert disease_foods" ON public.disease_foods FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='disease_foods' AND policyname='Public can delete disease_foods'
  ) THEN
    CREATE POLICY "Public can delete disease_foods" ON public.disease_foods FOR DELETE USING (true);
  END IF;
END $$;

-- self_care_procedures policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='self_care_procedures' AND policyname='Public can update self_care_procedures'
  ) THEN
    CREATE POLICY "Public can update self_care_procedures" ON public.self_care_procedures FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='self_care_procedures' AND policyname='Public can insert self_care_procedures'
  ) THEN
    CREATE POLICY "Public can insert self_care_procedures" ON public.self_care_procedures FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='self_care_procedures' AND policyname='Public can delete self_care_procedures'
  ) THEN
    CREATE POLICY "Public can delete self_care_procedures" ON public.self_care_procedures FOR DELETE USING (true);
  END IF;
END $$;

-- blogs policies (for admin UI CUD)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blogs' AND policyname='Public can update blogs'
  ) THEN
    CREATE POLICY "Public can update blogs" ON public.blogs FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blogs' AND policyname='Public can insert blogs'
  ) THEN
    CREATE POLICY "Public can insert blogs" ON public.blogs FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='blogs' AND policyname='Public can delete blogs'
  ) THEN
    CREATE POLICY "Public can delete blogs" ON public.blogs FOR DELETE USING (true);
  END IF;
END $$;