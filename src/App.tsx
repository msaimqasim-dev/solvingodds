import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { initSmoothScroll } from "./utils/smoothScroll";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RouteEffects } from "./components/RouteEffects";
import { Home } from "./pages/Home";
import { ServicesOverview } from "./pages/ServicesOverview";
import { ServiceDetail } from "./pages/ServiceDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import "./styles/services.css";

function SiteApplication() {
  const { pathname } = useLocation();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const destroySmoothScroll = initSmoothScroll();
    return () => {
      destroySmoothScroll();
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return (
    <div
      id="site-top"
      className="relative min-h-screen w-full overflow-x-clip bg-[#151817] text-white"
    >
      <Header key={`header-${pathname}`} />
      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none"
        key={pathname}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer key={`footer-${pathname}`} />
      <RouteEffects />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <SiteApplication />
    </BrowserRouter>
  );
}

export default App;
