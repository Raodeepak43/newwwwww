-- Add Razorpay payment tracking columns to users table
alter table public.users
  add column if not exists razorpay_payment_id text,
  add column if not exists razorpay_order_id text,
  add column if not exists plan_updated_at timestamptz;
