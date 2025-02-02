"use client";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./sidebar";
import Chatbot from './Chatbot'
// import Header from './components/Header';
// import MyMessages from './components/MyMessages';

export default function JoyMessagesTemplate() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Chatbot />
      </Box>
    </CssVarsProvider>
  );
}
