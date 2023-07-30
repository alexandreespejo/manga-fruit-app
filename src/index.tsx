import React from "react";
import 'react-native-gesture-handler';
import { useLoadedAssets } from "./hooks/useLoadedAssets"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Screens from "./screens";

function Main() {
  const assetsLoad = useLoadedAssets()
  const queryClient = new QueryClient()

  if (!assetsLoad) return null

  return (
    <QueryClientProvider client={queryClient}>
      <Screens />
    </QueryClientProvider>
  )
}

export default Main;
