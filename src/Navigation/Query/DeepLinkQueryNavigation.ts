import TextEditScreenNavigator from "./ConcreteNavigators/TextEditScreenNavigator";
import UrlQuery from "./UrlQuery";
import UrlQueryNavigator from "./UrlQueryNavigator";

class DeepLinkQueryNavigation implements UrlQuery {
    private readonly navigators: UrlQueryNavigator[] = [
        new TextEditScreenNavigator()
    ];

    private next?: UrlQuery;

    constructor(next?: UrlQuery) {
        this.next = next
    }

    load<Result>(url: URL, props: any): Promise<Result> {
        for (const navigator of this.navigators) {
            if (navigator.canNavigate(url)) {
                return navigator.navigate(url, props);
            }
        }
        return this.next?.load(url, props) ?? Promise.reject(new Error('No processor found to load from url "${url.toString()}"'))
    }
}

const deeplinkNavigationInstance = new DeepLinkQueryNavigation();
export const urlQuery: UrlQuery = deeplinkNavigationInstance;