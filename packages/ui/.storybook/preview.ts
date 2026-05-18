import type { Preview } from "@storybook/nextjs-vite";
import "../src/tailwind.css";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    a11y: {
      test: "error"
    },
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#FFFFFF" },
        { name: "mint", value: "#EAF7F4" },
        { name: "navy", value: "#002447" }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      toc: true
    },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Colors", "Typography", "Spacing, Radius, Shadows", "Accessibility"],
          "Components",
          ["Actions", "Forms", "Feedback", "Layout", "Navigation", "Overlays"],
          "Engineering Guide"
        ]
      }
    }
  },
  tags: ["autodocs"]
};

export default preview;
