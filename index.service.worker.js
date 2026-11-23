// Antes el juego vivía en la raíz de la web y dejó instalado aquí su service worker (que sirve la copia guardada).
// Ahora en la raíz está la cuenta atrás y el juego en juego/: este service worker sustituye al viejo, se da de baja
// y recarga las pestañas abiertas para que se vea la página nueva. El juego registra el suyo dentro de juego/.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    await self.registration.unregister();
    const pestanas = await self.clients.matchAll({ type: "window" });
    for (const p of pestanas) p.navigate(p.url);
  })());
});
