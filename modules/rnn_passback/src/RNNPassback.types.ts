export type ScreenError = {
  value: string;
}

export type ScreenResult = {
  data: any;
}

export type ScreenResultPayload = {
  id: string;
  status: ScreenError | ScreenResult;
}

export type NavigateToUrlPayload = {
  requestId: string;
  url: string;
  props: any;
}