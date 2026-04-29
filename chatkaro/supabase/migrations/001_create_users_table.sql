-- Create a public users table linked to Supabase auth.users
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  business_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;

-- Users can read their own row
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

-- Users can insert their own row
create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Users can update their own row
create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Auto-create a user profile when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, business_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'business_name', '')
  );
  return new;
end;
$$;

-- Trigger on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
