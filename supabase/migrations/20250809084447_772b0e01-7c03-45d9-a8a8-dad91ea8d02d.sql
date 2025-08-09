DO $$ BEGIN
  -- Safely create/update triggers; ignore if they already exist
  BEGIN
    CREATE TRIGGER update_HS_user_profiles_updated_at
    BEFORE UPDATE ON public."HS_user_profiles"
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;

  BEGIN
    CREATE TRIGGER update_HS_assessments_updated_at
    BEFORE UPDATE ON public."HS_assessments"
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;

  BEGIN
    CREATE TRIGGER update_HS_responses_updated_at
    BEFORE UPDATE ON public."HS_responses"
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;