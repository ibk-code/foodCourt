import React, { useState } from "react";

function useSettings() {
  const userSetting: unknown | null = localStorage.getItem("user_settings");

  // ------- component state managers -------
  const [criteriaObjects, setCriteriaObjects] = useState<{
    [k: string]: boolean;
  } | null>(userSetting as { [k: string]: boolean });

  /**
   * Handle user data persist to localstorage
   * @param val
   */
  const persistData = (val: null | { [k: string]: boolean }) => {
    if (val && Object.keys(val).length > 0) {
      localStorage.setItem("user_settings", JSON.stringify(val));
    } else {
      localStorage.removeItem("user_settings");
    }
  };

  /**
   * Update user criteria password options
   * @param e
   */
  const updatecriteria = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;

    let updatedCriteriaObj;

    if (checked) {
      updatedCriteriaObj = {
        [name]: checked,
        ...(checked ? criteriaObjects : {}),
      };
    } else {
      updatedCriteriaObj = { ...criteriaObjects };
      delete updatedCriteriaObj[name];
    }

    setCriteriaObjects({ ...updatedCriteriaObj });
    persistData(updatedCriteriaObj);
  };

  return {
    userSetting: userSetting ? JSON.parse(userSetting as string) : userSetting,
    persistData,
    criteriaObjects,
    updatecriteria,
  };
}

export default useSettings;
