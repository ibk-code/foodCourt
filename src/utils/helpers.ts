export const criteriasObj: {
  [k: string]: { [k: string]: string };
} = {
  upperCase: { name: "upperCase", desc: "At least 1 uppercase" },
  lowerCase: { name: "lowerCase", desc: "At least 1 lowercase" },
  number: { name: "number", desc: "At least 1 figure" },
  specialCharacter: {
    name: "specialCharacter",
    desc: "At least 1 special character - !@#$%^&*()",
  },
  criteriaLength: {
    name: "criteriaLength",
    desc: "At least 8 characters long",
  },
};

export const criterias = [...Object.values(criteriasObj)];

/**
 * Validate user methods for password criteria obj
 */
export const validateMethods: { [k: string]: (val: string) => boolean } = {
  upperCase: (val: string) => /[A-Z]{1,}/.test(val),
  lowerCase: (val: string) => /[a-z]{1,}/.test(val),
  number: (val: string) => /\d{1,}/.test(val),
  specialCharacter: (val: string) =>
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,}/.test(val),

  criteriaLength: (val: string) => val.length >= 8,
};

/**
 * Handle hard password strength validation
 * @param val
 * @returns
 */
export const hardPasswordStrength = (val: string) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

  return regex.test(val);
};

/**
 * Handle medium password strength validation
 * @param val
 * @returns
 */
export const mediumPasswordStrength = (val: string) => {
  const regex = /^(?=.*?[A-Z]){1,}(?=.*?[a-z]){1,}(?=.*?[#?!@$%^&*-]){1,}/;

  return regex.test(val);
};
