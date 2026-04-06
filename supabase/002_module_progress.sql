create table if not exists public.user_module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  status text not null default 'not_started',
  progress integer not null default 0,
  started_at timestamptz null,
  completed_at timestamptz null,
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, module_id),
  constraint user_module_progress_status_check
    check (status in ('not_started', 'in_progress', 'completed')),
  constraint user_module_progress_progress_check
    check (progress >= 0 and progress <= 100)
);

alter table public.user_module_progress enable row level security;

drop policy if exists "user_module_progress_select_own" on public.user_module_progress;
create policy "user_module_progress_select_own"
on public.user_module_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "user_module_progress_insert_own" on public.user_module_progress;
create policy "user_module_progress_insert_own"
on public.user_module_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "user_module_progress_update_own" on public.user_module_progress;
create policy "user_module_progress_update_own"
on public.user_module_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "user_module_progress_delete_own" on public.user_module_progress;
create policy "user_module_progress_delete_own"
on public.user_module_progress
for delete
to authenticated
using (auth.uid() = user_id);
