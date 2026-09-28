/* Save */

const saveButton =
  document.getElementById("save");

if (saveButton) {

  saveButton.addEventListener("click", async () => {

    /* Local backup */

    localStorage.setItem(
      "portifolioData",
      JSON.stringify(d)
    );

    /* Supabase */

    if (!window.supabaseClient) {

      show(
        "Saved locally. Supabase is not connected."
      );

      return;
    }

    try {

      const payload = {
        id: 1,
        data: d,
        updated_at: new Date().toISOString()
      };

      const { error } =
        await window.supabaseClient
          .from("portifolio")   // ← DB table
          .upsert(payload);

      if (error) {

        console.error(
          "Supabase save error:",
          error
        );

        show(
          "Supabase save failed: " +
          error.message
        );

        return;
      }

      show(
        "Changes saved successfully."
      );

    } catch (error) {

      console.error(error);

      show(
        "Save failed: " +
        error.message
      );
    }
  });
}


/* Load Supabase */

async function loadFromSupabase() {

  if (!window.supabaseClient) {

    console.warn(
      "Supabase unavailable. Using local data."
    );

    return;
  }

  try {

    const {
      data: row,
      error
    } = await window.supabaseClient
      .from("portifolio")   // ← DB table
      .select("data")
      .eq("id", 1)
      .maybeSingle();

    if (error) {

      console.error(
        "Supabase load error:",
        error
      );

      return;
    }

    if (!row || !row.data) {
      return;
    }

    d = {
      ...d,
      ...row.data,
      profile: normalizeProfile(
        row.data.profile
      )
    };

    localStorage.setItem(
      "portifolioData",
      JSON.stringify(d)
    );

    render("profile");

  } catch (error) {

    console.error(
      "Supabase load failed:",
      error
    );
  }
}
