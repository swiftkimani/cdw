"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()
  const resolvedTheme: "light" | "dark" | "system" = theme === "light" || theme === "dark" ? theme : "system"

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

// "use client";

// import { useTheme } from "next-themes";
// import { Toaster as Sonner, ToasterProps } from "sonner";

// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = "system" } = useTheme();

//   return (
//     <Sonner
//       theme={theme as ToasterProps["theme"]}
//       className="toaster group"
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)",
//         } as React.CSSProperties
//       }
//       {...props}
//     />
//   );
// };

// export { Toaster };
