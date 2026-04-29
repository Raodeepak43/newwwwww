-- Add WhatsApp number and preferred language to users table
alter table public.users
  add column if not exists whatsapp_number text unique,
  add column if not exists language text not null default 'Hindi';

-- Index for fast webhook lookups by WhatsApp number
create index if not exists idx_users_whatsapp_number
  on public.users (whatsapp_number);

-- Messages table: stores every incoming message and AI reply
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  from_number text not null,
  to_number text not null,
  customer_message text not null,
  ai_reply text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS on messages
alter table public.messages enable row level security;

-- Users can read their own messages
create policy "Users can view own messages"
  on public.messages for select
  using (auth.uid() = user_id);

-- Service role (used by webhook) can insert messages; no auth.uid() check needed
-- since inserts come from the server-side API route using the service role key.
create policy "Service role can insert messages"
  on public.messages for insert
  with check (true);

-- Index for fetching messages by user
create index if not exists idx_messages_user_id
  on public.messages (user_id, created_at desc);
