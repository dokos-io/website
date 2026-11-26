// The files of the content search, fetched once, on the first opening of the
// search modal rather than with every page.
export function useDeferredSearchIndex() {
    const { open } = useContentSearch()
    const { data: files, execute, status } = useLazyFetch('/api/search.json', {
        default: () => [],
        server: false,
        immediate: false,
    })

    watch(open, (isOpen) => {
        if (isOpen && status.value === 'idle') execute()
    })

    return { files }
}
