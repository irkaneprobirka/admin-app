import React, { lazy, Suspense } from "react";
const App1 = lazy(() => import("app1/App"));
const App2 = lazy(() => import("app2/App"));
class AppBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) return <p role="alert">Не удалось загрузить приложение: {this.state.error.message}. Проверьте сервер приложения и обновите страницу.</p>;
    return this.props.children;
  }
}
function apiUrl(name, port) {
  const config = window.APPS_CONFIG || {};
  if (config[name + "ApiUrl"]) return config[name + "ApiUrl"];
  const url = new URL(config[name + "Url"] || window.location.origin);
  url.port = port; url.pathname = "/api/inputs"; url.search = ""; url.hash = "";
  return url.href;
}
export default function Main() {
  return <main style={{ display: "flex", flexDirection: "column", gap: 20, padding: 20 }}>
    {[{ name: "app1", Component: App1, port: 4005 }, { name: "app2", Component: App2, port: 4006 }].map(({ name, Component, port }) =>
      <section key={name} style={{ border: "1px solid #ddd", padding: 10 }}>
        <h2>{name}</h2>
        <AppBoundary><Suspense fallback={<p>Загрузка {name}…</p>}><Component apiUrl={apiUrl(name, port)} /></Suspense></AppBoundary>
      </section>
    )}
  </main>;
}
