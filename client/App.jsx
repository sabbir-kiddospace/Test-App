import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import routes from "./Routes";
import AppBridgeProvider from "./providers/AppBridgeProvider";
import "./index.css"


export default function App() {
  const RouteComponents = useRoutes(routes);

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider>
        <ui-nav-menu>
          
          <a href="/shop">Shop</a>
          <a href="/collection-list">Collection List</a>
          <a href="/create-collection">Create Collection</a>
          {/* <a href="/debug/data">Fetch Data</a> */}
          {/* <a href="/debug/billing">Billing API</a> */}
        </ui-nav-menu>
        {RouteComponents}
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
