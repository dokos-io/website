import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { NavigationTree } from '#ui-pro/types'

const navMap = {
    'title': 'label',
    '_path': 'to'
}

export default function mapContentLocaleNavigation(navigation: NavItem[], rootNavigation?: NavItem[]): NavigationTree[] {
    const localePath = useLocalePath()
    return navigation.map((navLink) => {
        const link = {} as NavigationTree
        for (const key in navLink) {
            if (key === 'children') {
                link.children = navLink.children?.length ? mapContentLocaleNavigation(navLink.children, rootNavigation) : undefined
                continue
            }
            if (navLink[key]) {
                // @ts-ignore
                link[navMap[key] || key] = key === '_path' ? localePath(navLink[key]) : navLink[key]
            }
        }
        return link
    })
}