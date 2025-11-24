-- Create enum for ad positions
create type public.ad_position as enum ('top_banner', 'sidebar', 'in_content', 'bottom_banner', 'mobile_sticky');

-- Create ads table
create table public.ads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  link_url text,
  position ad_position not null,
  is_active boolean not null default true,
  priority integer not null default 0,
  click_count integer not null default 0,
  impression_count integer not null default 0,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.ads enable row level security;

-- Policy: Everyone can view active ads
create policy "Anyone can view active ads"
on public.ads
for select
to authenticated, anon
using (is_active = true and (start_date is null or start_date <= now()) and (end_date is null or end_date >= now()));

-- Policy: Only admins can insert ads
create policy "Admins can insert ads"
on public.ads
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update ads
create policy "Admins can update ads"
on public.ads
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can delete ads
create policy "Admins can delete ads"
on public.ads
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can view all ads (including inactive)
create policy "Admins can view all ads"
on public.ads
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
create or replace function public.update_ads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger for updated_at
create trigger update_ads_updated_at
before update on public.ads
for each row
execute function public.update_ads_updated_at();

-- Create function to track ad impressions
create or replace function public.increment_ad_impression(ad_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ads
  set impression_count = impression_count + 1
  where id = ad_id;
end;
$$;

-- Create function to track ad clicks
create or replace function public.increment_ad_click(ad_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ads
  set click_count = click_count + 1
  where id = ad_id;
end;
$$;