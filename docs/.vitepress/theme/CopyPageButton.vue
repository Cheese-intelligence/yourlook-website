<script setup lang="ts">
import { ref } from "vue";

const copied = ref(false);

const copyPageMarkdown = async () => {
    try {
        // VitePress makes the rendered doc container available via .vp-doc
        const docEl = document.querySelector(".vp-doc");
        if (!docEl) return;

        // Copies plain text content of the page
        const text = (docEl as HTMLElement).innerText;
        await navigator.clipboard.writeText(text);

        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error("Failed to copy page content: ", err);
    }
};
</script>

<template>
    <div class="copy-page-wrapper">
        <button
            type="button"
            class="copy-page-btn"
            :class="{ copied }"
            @click="copyPageMarkdown"
        >
            <span v-if="!copied">📋 Copy Full Page</span>
            <span v-else>✅ Copied to Clipboard!</span>
        </button>
    </div>
</template>

<style scoped>
.copy-page-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
}

.copy-page-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: all 0.2s ease;
}

.copy-page-btn:hover {
    background-color: var(--vp-c-bg-mute);
    border-color: var(--vp-c-brand-1);
}

.copy-page-btn.copied {
    border-color: #22c55e;
    color: #22c55e;
}
</style>
