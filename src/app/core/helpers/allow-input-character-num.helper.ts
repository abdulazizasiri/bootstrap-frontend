export function allowArabicOnly(event: KeyboardEvent) {
  const charCode = event.key;

  if (charCode !== undefined && !(/^[\u0600-\u06FF\s]+$/.test(charCode))) {
    event.preventDefault();
  }
}

export function allowEnglishOnly(event: KeyboardEvent) {
  const charCode = event.key;

  if (charCode !== undefined && !(/^[a-zA-Z0-9 ]+$/.test(charCode))) {
    event.preventDefault();
  }
}

export function allowEnglishNoNum(event: KeyboardEvent) {
  const charCode = event.key;

  if (charCode !== undefined && !(/^[a-zA-Z ]+$/.test(charCode))) {
    event.preventDefault();
  }
}

export function allowNumbersOnly(event: KeyboardEvent) {
  const charCode = event.charCode;

  if (charCode !== undefined && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
  }
}