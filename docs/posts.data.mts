import { createContentLoader } from 'vitepress'

export interface DocItem {
    title: string
    url: string
}

declare const data: DocItem[]
export { data }

export default createContentLoader('**/*.md', {
    transform(raw): DocItem[] {
        return raw
            .filter((page) => page.url !== '/' && !page.url.includes('index'))
            .map((page) => {
                const fallbackTitle = page.url
                    .replace(/^\//, '')
                    .replace(/\.html$/, '')
                    .replace(/.*\//, '')
                    .replace(/-/g, ' ')

                return {
                    title: (page.frontmatter?.title as string) || fallbackTitle,
                    url: page.url,
                }
            })
            .sort((a, b) => a.title.localeCompare(b.title))
    },
})
