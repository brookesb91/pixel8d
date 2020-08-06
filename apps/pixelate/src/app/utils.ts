export const copyMessage = (val: string) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};

export const resize = <T>(arr: T[], size: number, defaultValue: T) => {
  const diff = size - arr.length;

  return diff === 0
    ? arr
    : diff < 0
    ? [...arr.slice(0, size)]
    : [...arr, ...new Array(diff).fill(defaultValue)];
};
