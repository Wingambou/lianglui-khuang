self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = {};
  }

  const title = "LIANGLUI KHUANG";
  const options = {
    body: "A new review has been submitted.",
    icon: "/lianglui-khuang/icons/icon-192.png",
    badge: "/lianglui-khuang/icons/icon-192.png",
    tag: "lianglui-new-review",
    data: {
      url: "/lianglui-khuang/review-admin"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    "/lianglui-khuang/review-admin",
    self.location.origin
  ).href;

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
