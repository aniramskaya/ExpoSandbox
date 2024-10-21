interface UrlNavigator {
    canNavigate(url: URL): boolean
    navigate(url: URL, props: any): void
}

export default UrlNavigator;