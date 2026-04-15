import { supabase } from './supabase';

export interface ContactPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  source?: string;
}

/**
 * Saves a contact/lead into the Supabase `contacts` table.
 * Fails silently — the WhatsApp flow continues regardless of the result.
 *
 * SQL to create the table in Supabase:
 * ─────────────────────────────────────────────────────────────────────────
 * create table contacts (
 *   id          uuid        default gen_random_uuid() primary key,
 *   created_at  timestamptz default now() not null,
 *   first_name  text        not null,
 *   last_name   text,
 *   email       text        not null,
 *   phone       text,
 *   interest    text,
 *   message     text,
 *   source      text        default 'contact_page'
 * );
 *
 * -- Row Level Security (recommended — allow inserts from anon key)
 * alter table contacts enable row level security;
 * create policy "Allow anon inserts" on contacts
 *   for insert to anon with check (true);
 * ─────────────────────────────────────────────────────────────────────────
 */
export async function saveContact(payload: ContactPayload): Promise<void> {
  if (!supabase) {
    // Supabase not configured — silently skip
    return;
  }

  try {
    const { error } = await supabase.from('contacts').insert([
      {
        first_name: payload.first_name,
        last_name: payload.last_name || null,
        email: payload.email,
        phone: payload.phone || null,
        interest: payload.interest || null,
        message: payload.message || null,
        source: payload.source || 'contact_page',
      },
    ]);

    if (error) {
      console.warn('[Essencia] Supabase insert error:', error.message);
    }
  } catch (err) {
    console.warn('[Essencia] Supabase saveContact failed:', err);
  }
}
