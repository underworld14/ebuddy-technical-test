import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme, { roboto } from "@/theme/theme";
import ReduxProvider from "@/store/ReduxProvider";
import AuthInitializer from "@/components/AuthInitializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "EBuddy Test App",
  description:
    "Frontend for EBuddy Technical Test with Material UI and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReduxProvider>
              <AuthInitializer>{children}</AuthInitializer>
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
