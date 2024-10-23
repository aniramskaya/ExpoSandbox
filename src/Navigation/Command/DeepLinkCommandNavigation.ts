import NativeScreen1Navigator from "./ConcreteNavigators/NativeScreen1Navigator";
import TextScreenNavigator from "./ConcreteNavigators/TextScreenNavigator";
import UrlCommand from "./UrlCommand";
import UrlCommandNavigator from "./UrlCommandNavigator";
import NativeTextScreenNavigator from "./ConcreteNavigators/NativeTextScreenNavigator";

class DeepLinkCommandNavigation implements UrlCommand {
    private readonly navigators: UrlCommandNavigator[] = [
        new NativeScreen1Navigator(),
        new TextScreenNavigator(),
        new NativeTextScreenNavigator()
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

const deeplinkNavigationInstance = new DeepLinkCommandNavigation();
export const urlCommand: UrlCommand = deeplinkNavigationInstance;