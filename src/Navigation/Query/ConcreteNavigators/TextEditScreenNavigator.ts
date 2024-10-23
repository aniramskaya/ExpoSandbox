import UrlQueryNavigator from "../UrlQueryNavigator";
import { Navigation } from "react-native-navigation";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  ScreenResult,
  ScreenError,
  addScreenResultListener,
  ScreenResultPayload,
} from "../../../../modules/rnn_passback";

const Colors = {
  buttonColor: "#14B746",
  titleColor: "#000000",
};

export type TextEditScreenData = {
  text: string;
};

class TextEditScreenNavigator implements UrlQueryNavigator {
  private componentId?: string;

  constructor() {
    addScreenResultListener((payload) => {
      this.handleScreenresult(payload);
    });
  }

  private handleScreenresult(payload: ScreenResultPayload) {
    const pending = this.pendingResults[payload.id];
    if (pending) {
      delete this.pendingResults[payload.id];
      Navigation.dismissModal(pending.id);
      pending.callback(payload.status);
    }
  }

  canNavigate(url: URL): boolean {
    return url.toString() == "rnn:///native-text-edit-screen/";
  }

  navigate<Result>(url: URL, props: any): Promise<Result> {
    if (!this.canNavigate(url)) {
      return Promise.reject(
        new Error(
          'Url is unsupported by ${this.constructor.name}  "${url.toString()}"'
        )
      );
    }
    return new Promise((resolve, reject) => {
      const requestId = uuidv4();
      Navigation.showModal({
        stack: {
          children: [
            {
              externalComponent: {
                name: "TextEditScreen",
                options: {
                  topBar: {
                    title: {
                      text: props.title,
                    },
                  },
                },
                passProps: { id: requestId, data: props.data },
              },
            },
          ],
        },
      })
        .then((componentId: string) => {
          this.waitForResult(requestId, componentId, resolve, reject);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private pendingResults: {
    [key: string]: {
      id: string;
      callback: (payload: ScreenResult | ScreenError) => void;
    };
  } = {};

  private waitForResult<Result>(
    id: string,
    componentId: string,
    resolve: (value: Result) => void,
    reject: (reason: any) => void
  ): void {
    this.pendingResults[id] = {
      id: componentId,
      callback: (result) => {
        if (this.isScreenResult(result)) {
          resolve(result.data as Result);
        } else {
          reject(result.value);
        }
      },
    };
  }

  private isScreenResult(
    status: ScreenResult | ScreenError
  ): status is ScreenResult {
    return (status as ScreenResult) !== undefined;
  }
}

export default TextEditScreenNavigator;
