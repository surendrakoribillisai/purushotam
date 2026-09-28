window.SUPABASE_URL = "https://hjgxzpfbyevisssuteps.supabase.co";

window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6rqyiBlM3Mcxo2kyMxXPEQ_KpcZms9g";

try {
  window.supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_PUBLISHABLE_KEY
  );

  console.log("Supabase connected");
} catch (e) {
  console.error("Supabase connection failed:", e);
  window.supabaseClient = null;
}
