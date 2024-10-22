interface UrlQueryNavigator {
    canNavigate(url: URL): boolean
    navigate<Result>(url: URL, props: any): Promise<Result>
}

export default UrlQueryNavigator;