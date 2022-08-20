export interface BottomSheetRef {
  showModal: () => void;
}

export interface BottomSheetProps {
  children: () => JSX.Element;
}
