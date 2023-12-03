import React from "react";

import ExitFrame from "./ExitFrame";
import Index from "./pages/Index";
import BillingAPI from "./pages/debug/Billing";
import GetData from "./pages/debug/Data";
import DebugIndex from "./pages/debug/Index";
import ActiveWebhooks from "./pages/debug/Webhooks";
import NoPage from "./pages/NoPage";
import Shop from "./pages/Shop";
import CollectionList from "./pages/CollectionList";
import CreateCollection from "./pages/CreateCollection";
import EditCollection from "./pages/EditCollection";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";

const routes = {
  "/": () => <Index />,
  "/exitframe": () => <ExitFrame />,
  "/exitframe/:shop": ({ shop }) => <ExitFrame shop={shop} />,
  "/debug": () => <DebugIndex />,
  "/debug/webhooks": () => <ActiveWebhooks />,
  "/debug/billing": () => <BillingAPI />,
  "/debug/data": () => <GetData />,
  "/shop": () => <Shop />,
  "/collection-list": () => <CollectionList />,
  "/create-collection": () => <CreateCollection />,
  "/product-list": () => <ProductList />,
  "/edit-collection": () => <EditCollection />,
  "/edit-product": () => <EditProduct />,
  "*": () => <NoPage />,

  //Add your routes here
};

export default routes;
