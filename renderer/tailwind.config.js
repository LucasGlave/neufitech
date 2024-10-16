module.exports = {
  darkMode: ["class"],
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        tiktok: "#ff3b5c",
        border: "hsl(var(--border))",
        keybackground: "#011820",
        keyboardHeader: "#576280",
        charge: "#4ade80",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Añadir keyframes para la animación `flash`
        flash: {
          "0%, 100%": { backgroundColor: "rgb(40, 40, 40)" },
          "50%": { backgroundColor: "#4caf50" },
        },
        growBarY: {
          "0%": { height: "0%", opacity: "1" },
          "99%": { height: "100%", opacity: "1" },
          "100%": { height: "100%", opacity: "0" },
        },
        growBarX: {
          "0%": { width: "0%", opacity: "1" },
          "99%": { width: "100%", opacity: "1" },
          "100%": { width: "100%", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Añadir la animación `flash`
        flash: "flash 0.2s ease-in-out",
        "grow-bar-y": "growBarY 3s ease forwards",
        "grow-bar-x": "growBarX 3s ease forwards",
      },
      fontSize: {
        "5xl": "2rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
