interface UrlQuery {
    load<Result>(url: URL, props: any): Promise<Result>
}

export default UrlQuery;