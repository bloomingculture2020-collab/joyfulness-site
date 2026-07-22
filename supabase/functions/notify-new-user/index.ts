import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = "mennobraakman@joyfulness.company";
const NOTIFY_FROM = "Seizoenplotter <noreply@joyfulness.company>";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  try {
    const { userEmail, orgName, orgType, projectCount } = await req.json();

    const now = new Date().toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "full",
      timeStyle: "short",
    });

    const html = `
      <div style="font-family:Georgia,serif;max-width:540px;margin:0 auto;padding:32px 24px;color:#2a2218">
        <p style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#2F6933;margin:0 0 12px">Seizoenplotter</p>
        <h1 style="font-size:24px;margin:0 0 8px;font-family:'Georgia',serif">Nieuwe gebruiker aangemeld 🌱</h1>
        <p style="color:#6b5f52;margin:0 0 24px;font-size:15px">${now}</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e7e1d4;color:#6b5f52;font-size:14px;width:140px">E-mail</td>
              <td style="padding:10px 0;border-bottom:1px solid #e7e1d4;font-size:15px;font-weight:600">${userEmail || '–'}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e7e1d4;color:#6b5f52;font-size:14px">Organisatie</td>
              <td style="padding:10px 0;border-bottom:1px solid #e7e1d4;font-size:15px;font-weight:600">${orgName || '–'}</td></tr>
          <tr><td style="padding:10px 0;color:#6b5f52;font-size:14px">Type</td>
              <td style="padding:10px 0;font-size:15px;font-weight:600">${orgType || '–'}</td></tr>
        </table>
        <p style="margin:32px 0 0;font-size:13px;color:#9a8f84">Dit bericht is automatisch verzonden door de Seizoenplotter.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        subject: `Nieuwe gebruiker: ${orgName} (${userEmail})`,
        html,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ ok: res.ok, data }), {
      status: res.ok ? 200 : 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
