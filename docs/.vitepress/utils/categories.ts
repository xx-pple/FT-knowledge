import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const DOCS_ROOT = path.resolve(HERE, '../..')

const EXCLUDED = new Set(['drafts', 'public'])

export interface Category {
  dir: string
  title: string
  description: string
  order: number
}

function parseFrontmatter(raw: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return { fm: {} as Record<string, string>, body: raw }
  const fm: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
  }
  return { fm, body: raw.slice(m[0].length) }
}

/**
 * 扫描 docs/ 下所有包含 index.md 的目录，视为一个分类。
 * 排序依据 index.md 的 frontmatter order（缺省 100），其次按目录名。
 */
export function scanCategories(): Category[] {
  return fs
    .readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !EXCLUDED.has(e.name))
    .map((e) => {
      const indexPath = path.join(DOCS_ROOT, e.name, 'index.md')
      if (!fs.existsSync(indexPath)) return null
      const raw = fs.readFileSync(indexPath, 'utf8')
      const { fm, body } = parseFrontmatter(raw)
      const heading = body.match(/^#\s+(.+)$/m)?.[1]?.trim()
      return {
        dir: e.name,
        title: fm.title || heading || e.name,
        description: fm.description || '',
        order: Number(fm.order ?? 100),
      }
    })
    .filter((c): c is Category => c !== null)
    .sort((a, b) => a.order - b.order || a.dir.localeCompare(b.dir))
}
