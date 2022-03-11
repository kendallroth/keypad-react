import React from "react";

type Props = {
  /** Whether keypad is disabled */
  disabled?: boolean;
  /** Digit label text */
  label: string | number;
  /** Press handler */
  onPress: () => void;
};

const KeypadDigit = (props: Props) => {
  const { disabled = false, label, onPress: onPressProp } = props;

  const onPress = !disabled ? onPressProp : () => {};

  let className = "keypad-keys__digit";
  if (disabled) {
    className += " is-disabled";
  }

  return (
    <div className={className} onClick={onPress}>
      {label}
    </div>
  );
};

export default KeypadDigit;
