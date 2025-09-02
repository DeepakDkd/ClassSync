import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/Home.tsx";
import { createTheme, MantineProvider } from "@mantine/core";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
    </Route>
  )
);
// const theme = createTheme({
//   /** Your theme override here */
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <MantineProvider theme={theme}> */}
    <MantineProvider >
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
