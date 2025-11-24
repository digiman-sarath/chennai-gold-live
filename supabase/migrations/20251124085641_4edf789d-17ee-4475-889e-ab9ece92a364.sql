-- Fix search_path for functions
create or replace function public.update_ads_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.increment_ad_impression(ad_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ads
  set impression_count = impression_count + 1
  where id = ad_id;
end;
$$;

create or replace function public.increment_ad_click(ad_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ads
  set click_count = click_count + 1
  where id = ad_id;
end;
$$;