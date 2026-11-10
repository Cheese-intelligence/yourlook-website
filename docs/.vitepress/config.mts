import { defineConfig } from "vitepress";

/**
 * DOCS HUB & BASE INDEX FOR AGENTS AND DEVELOPERS
 *
 * Use this file as the primary index to discover established architecture
 * patterns, UI conventions, and engineering standards across the project.
 */
export default defineConfig({
  title: "YourLook Web",
  description: "Documentation for YourLook Web",
  markdown: {
    config: (md) => {
      const symbolMap: Record<string, string> = {
        "\\rightarrow": "→",
        "\\to": "→",
        "\\leftarrow": "←",
        "\\gets": "←",
        "\\leftrightarrow": "↔",
        "\\Rightarrow": "⇒",
        "\\Leftarrow": "⇐",
        "\\Leftrightarrow": "⇔",
        "\\le": "≤",
        "\\leq": "≤",
        "\\ge": "≥",
        "\\geq": "≥",
        "\\neq": "≠",
        "\\approx": "≈",
        "\\times": "×",
        "\\div": "÷",
        "\\cdot": "·",
        "\\pm": "±",
        "\\mp": "∓",
        "\\dots": "…",
        "\\ldots": "…",
        "\\cdots": "⋯",
        "\\in": "∈",
        "\\notin": "∉",
        "\\subset": "⊂",
        "\\subseteq": "⊆",
        "\\supset": "⊃",
        "\\supseteq": "⊇",
        "\\cup": "∪",
        "\\cap": "∩",
        "\\emptyset": "∅",
        "\\forall": "∀",
        "\\exists": "∃",
        "\\neg": "¬",
        "\\infty": "∞",
        "\\degree": "°",
        "\\alpha": "α",
        "\\beta": "β",
        "\\gamma": "γ",
        "\\delta": "δ",
        "\\lambda": "λ",
        "\\pi": "π",
        "\\sigma": "σ",
        "\\theta": "θ",
        "\\omega": "ω",
        "\\Delta": "Δ",
        "\\Sigma": "Σ",
        "\\Omega": "Ω",
      };

      const regex = new RegExp(
        `\\$(${Object.keys(symbolMap)
          .map((k) => k.replace(/\\/g, "\\\\"))
          .join("|")})\\$`,
        "g",
      );

      md.core.ruler.push("tex_symbols", (state) => {
        for (const token of state.tokens) {
          if (token.type === "inline" && token.children) {
            for (const child of token.children) {
              if (child.type === "text") {
                child.content = child.content.replace(
                  regex,
                  (_, match) => symbolMap[match] ?? match,
                );
              }
            }
          }
        }
      });
    },
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "Getting Started",
        items: [{ text: "Setup & Installation", link: "/getting-started" }],
      },
      {
        text: "Architecture & Backend",
        items: [
          { text: "Web Architecture", link: "/architecture" },
          { text: "Legal Documents Workflow", link: "/legal-documents" },
        ],
      },
      {
        text: "Design & UI",
        items: [
          { text: "UI Components & Design System", link: "/components" },
        ],
      },
    ],
  },
});
