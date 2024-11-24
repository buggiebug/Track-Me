import React from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import App from "@/components/App";

export default function RootLayout() {
  return (<>
    <Provider store={store}>
      <App />
    </Provider>
  </>)
}
