-- « Effacer mes données » supprime la ligne de `profiles` : sans politique DELETE, RLS ne retire
-- aucune ligne et ne renvoie aucune erreur, donc l'opération paraît réussir alors que le profil survit.
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
on public.profiles
for delete
to authenticated
using (auth.uid() = user_id);

-- Contrôle sans effet de bord : doit rendre 4 lignes, dont « profiles_delete_own » en cmd = d.
select polname, polcmd::text
from pg_policy
where polrelid = 'public.profiles'::regclass
order by polname;
