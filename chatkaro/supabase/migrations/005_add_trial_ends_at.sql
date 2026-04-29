-- Add trial expiry tracking for free plan users
alter table public.users
  add column if not exists trial_ends_at timestamptz;

-- Set default trial end to 30 days from now for existing free users
update public.users
  set trial_ends_at = created_at + interval '30 days'
  where plan = 'free' and trial_ends_at is null;
