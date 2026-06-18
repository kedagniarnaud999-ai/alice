create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  profile_type text not null,
  profile_description text not null,
  natural_talents text[] not null default '{}',
  motivation_drivers text[] not null default '{}',
  primary_interests text[] not null default '{}',
  career_stage text not null,
  feasibility_assessment text not null,
  next_actions text[] not null default '{}',
  payload jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.test_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  selected_options text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists test_responses_user_id_idx on public.test_responses(user_id);

alter table public.profiles enable row level security;
alter table public.test_responses enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "test_responses_select_own" on public.test_responses;
create policy "test_responses_select_own"
on public.test_responses
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "test_responses_insert_own" on public.test_responses;
create policy "test_responses_insert_own"
on public.test_responses
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "test_responses_delete_own" on public.test_responses;
create policy "test_responses_delete_own"
on public.test_responses
for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();
