---
layout: doc
title: YourLook Web Documentation
---

<script setup>
import { data as posts } from './posts.data.mts'
</script>

# YourLook Web Docs

Welcome to the YourLook web engineering documentation.

## Available Guides

<div class="doc-list">
  <div v-for="post in posts" :key="post.url" class="doc-item">
    📄 <a :href="post.url">{{ post.title }}</a>
  </div>
</div>

<style>
.doc-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}
.doc-item a {
  font-weight: 500;
  text-decoration: none;
}
.doc-item a:hover {
  text-decoration: underline;
}
</style>
