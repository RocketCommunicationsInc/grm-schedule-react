export const addToast = (
  message: string,
  hideClose: boolean,
  closeAfter: number
) => {
  const toastStack = document.querySelector(
    'rux-toast-stack'
  ) as HTMLRuxToastStackElement;

  toastStack.addToast({
    message: message,
    hideClose: hideClose,
    closeAfter: closeAfter,
  });
};

export const addCommaToEquipString = (equipment: string) => {
  const equipmentStr = equipment.replace(/(\w+)/g, '$1,');
  return equipmentStr.replace(/,$/, '');
};
