import NativeScreen1Navigator from "./ConcreteNavigators/NativeScreen1Navigator";
import UrlCommand from "./UrlCommand";
import UrlNavigator from "./UrlNavigator";

class DeepLinkNavigation implements UrlCommand {
    private readonly navigators: UrlNavigator[] = [
        new NativeScreen1Navigator()
    ];

    private next?: UrlCommand;

    constructor(next?: UrlCommand) {
        this.next = next
    }

    execute(url: URL, props: any): void {
        for (const navigator of this.navigators) {
            if (navigator.canNavigate(url)) {
                navigator.navigate(url, props);
                return;
            }
        }
        this.next?.execute(url, props);
    }
}

const deeplinkNavigationInstance = new DeepLinkNavigation();
export const urlCommand: UrlCommand = deeplinkNavigationInstance;