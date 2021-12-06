export enum SlideDirection {
  Next = "Next",
  Previous = "Previous"
}

export type State = {
  activeSlideIndex: number;
};

export type Action = {
  payload: {
    indexToSlideTo: number;
  };
};
