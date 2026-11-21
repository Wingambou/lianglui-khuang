self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {};
  }

  const title = "LIANGLUI KHUANG";
  const scopeBase = self.registration.scope;
  const options = {
    body: "A new review has been submitted.",
    icon: new URL("icons/icon-192.png", scopeBase).href,
    badge: new URL("icons/icon-192.png", scopeBase).href,
    tag: "lianglui-new-review",
    data: {
      url: new URL("review-admin", scopeBase).href
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL("review-admin", self.registration.scope).href;

  event.waitUntil((async () => {
    const windows = await clients.matchAll({
      type: "window",
      includeUncontrolled: true
    });

    for (const windowClient of windows) {
      if (windowClient.url.startsWith(targetUrl)) {
        return windowClient.focus();
      }
    }

    return clients.openWindow(targetUrl);
  })());
});
