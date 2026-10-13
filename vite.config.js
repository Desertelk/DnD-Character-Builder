import { defineConfig } from "vite";

export default defineConfig({
    base: "/DnD-Character-Builder/",
    build: {
        rollupOptions: {
            input: {
                main: "index.html",
                summary: "summary.html",
                characters: "characters.html"
            }
        }
    }
});