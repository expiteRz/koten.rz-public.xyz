import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    ssr: false,
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ["legacy-js-api"]
                }
            }
        }
    }
});
