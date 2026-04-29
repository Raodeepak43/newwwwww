-- Add business description for AI context and plan tracking
alter table public.users
  add column if not exists business_description text not null default '',
  add column if not exists plan text not null default 'free';
