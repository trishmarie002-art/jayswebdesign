-- Run this in the Supabase SQL Editor to set up your database tables

-- 1. Create Admins table
create table if not exists public.admins (
  id uuid references auth.users not null primary key,
  email text
);

-- Turn off Row Level Security (RLS) for testing, or set up policies
alter table public.admins disable row level security;

-- 2. Create Projects table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  name text,
  url text,
  image text,
  category text,
  alt text,
  "order" numeric
);

alter table public.projects disable row level security;

-- 3. Create Site Content table
create table if not exists public.site_content (
  id text primary key,
  "heroTitle" text,
  "heroSubtitle" text,
  "heroImages" jsonb
);

alter table public.site_content disable row level security;

-- 4. Create Leads table
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text,
  service text,
  timeline text,
  budget text,
  website text,
  timestamp text,
  user_id uuid
);

alter table public.leads disable row level security;
