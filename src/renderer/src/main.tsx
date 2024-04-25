import "./assets/main.css"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { LazyMotion, MotionConfig } from "framer-motion"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { authConfigManager, SessionProvider } from "@hono/auth-js/react"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        lazy: () => import("./pages/index"),
      },
      {
        path: "login",
        lazy: () => import("./pages/login"),
      },
      {
        path: "debug",
        lazy: () => import("./pages/debug"),
      },
    ],
  },
])

const loadFeatures = () =>
  import("./framer-lazy-feature").then((res) => res.default)

const queryClient = new QueryClient()

authConfigManager.setConfig({
  baseUrl: "http://localhost:3000",
  basePath: "/auth",
  credentials: "same-origin",
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LazyMotion features={loadFeatures} strict key="framer">
      <MotionConfig
        transition={{
          type: "spring",
          duration: 0.3,
        }}
      >
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </SessionProvider>
      </MotionConfig>
    </LazyMotion>
  </React.StrictMode>,
)
