import { Link, MetaProvider, Stylesheet, Title } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { lazy } from "solid-js";
import { APP_TITLE } from "./consts";

const Home = lazy(() => import("./routes/Home"));
const Overlay = lazy(async () => await import("./routes/Overlay"));

export default () => (
  <Router>
    <MetaProvider>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <Stylesheet href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Quicksand:wght@300..700&family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&display=swap" />
      <Route path="/overlay" component={Overlay} />
      <Route path="/" component={Home} />
    </MetaProvider>
  </Router>
);
