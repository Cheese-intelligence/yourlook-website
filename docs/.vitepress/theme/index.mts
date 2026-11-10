// .vitepress/theme/index.mts
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import CopyPageButton from "./CopyPageButton.vue";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            "doc-before": () => h(CopyPageButton),
        });
    },
};
