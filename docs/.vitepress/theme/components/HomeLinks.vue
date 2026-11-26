<script setup lang="ts">
import { withBase } from 'vitepress'

const modules = import.meta.glob('../../../*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const EXCLUDED = new Set(['drafts', 'public'])

function parse(raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fm: Record<string, string> = {}
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
      if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
    }
  }
  return { fm, body: m ? raw.slice(m[0].length) : raw }
}

const items = Object.entries(modules)
  .map(([file, raw]) => {
    const seg = file.split('/')
    const dir = seg[seg.length - 2]
    if (EXCLUDED.has(dir)) return null
    const { fm, body } = parse(raw)
    const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim()
    return {
      dir,
      title: fm.title || heading || dir,
      description: fm.description || '',
      order: Number(fm.order ?? 100),
    }
  })
  .filter((x): x is { dir: string; title: string; description: string; order: number } => x !== null)
  .sort((a, b) => a.order - b.order || a.dir.localeCompare(b.dir))
</script>

<template>
  <div class="cat-grid">
    <a v-for="c in items" :key="c.dir" class="cat-card" :href="withBase(`/${c.dir}/`)">
      <span class="cat-title">{{ c.title }}</span>
      <span v-if="c.description" class="cat-desc">{{ c.description }}</span>
    </a>
  </div>
</template>

<style scoped>
.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 12px;
  margin: 8px 0 32px;
}

.cat-card {
  display: block;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, background-color 0.2s;
}

.cat-card:hover {
  border-color: var(--vp-c-brand-1);
}

.cat-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.cat-desc {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
</style>
