import { ImperativeRouter } from "expo-router";

type ContentRequest = {
  router: ImperativeRouter;
  contentId?: string;
  state?: (i: any) => void;
  localMemoState?: (i: any) => void;
};

export type Actions = {
  action: "back-page" | "push-page" | "get-data";
  contentRequest: ContentRequest;
};
