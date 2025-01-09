-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  dietary_preferences jsonb default '{"vegetarian": false, "vegan": false, "gluten_free": false, "dairy_free": false}'::jsonb,
  allergies text[] default array[]::text[],
  daily_goals jsonb default '{"calories": 2000, "protein": 50, "carbs": 275, "fat": 78}'::jsonb,
  notification_settings jsonb default '{"meal_reminders": true, "weekly_summary": true, "achievement_alerts": true}'::jsonb,
  theme_preference text default 'system'
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Drop existing triggers and functions if they exist
drop trigger if exists handle_profiles_updated_at on public.profiles;
drop function if exists public.handle_updated_at();
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Drop existing policies
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Create a trigger to set updated_at on update
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();

-- Create a function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 