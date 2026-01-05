const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbx3bmFACJO3_hxVRqfp7_eqgUa77vERgNUipC28dVGrS5x3DqQOrIPNJ1xDGA3ZaOtw/exec";

const form = document.getElementById("joinForm");
const msg  = document.getElementById("formMsg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!msg) return;

    msg.textContent = "";

    const fd = new FormData(form);

    if ((fd.get("website") || "").trim() !== "") {
      msg.textContent = "Error de validación.";
      return;
    }

    const payload = {
      name:  String(fd.get("name")  || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      page:      location.href,
      referrer:  document.referrer || "",
      userAgent: navigator.userAgent
    };

    if (payload.name.length < 2)   { msg.textContent = "Nombre inválido.";   return; }
    if (!payload.email.includes("@")) { msg.textContent = "Correo inválido.";   return; }
    if (payload.phone.length < 6)  { msg.textContent = "Teléfono inválido."; return; }

    try {
      msg.textContent = "Enviando...";

      const res = await fetch(SHEET_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo enviar");
      }

      window.location.href = "thanks.html";

    } catch (err) {
      console.error(err);
      msg.textContent = "No se pudo enviar. Revisa el endpoint o permisos del Script.";
    }
  });
}
