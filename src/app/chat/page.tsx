"use client";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./sidebar";
import Chatbot from "./Chatbot";
import { extendTheme } from "@mui/joy/styles";

export default function JoyMessagesTemplate() {
  const customTheme = extendTheme({ defaultColorScheme: "dark" } as any);

  return (
    <CssVarsProvider
      theme={customTheme}
      defaultMode="dark"
      defaultColorScheme="dark"
      modeStorageKey="custom-dark-mode"
      disableTransitionOnChange
    >
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Chatbot />
      </Box>
    </CssVarsProvider>
  );
}
