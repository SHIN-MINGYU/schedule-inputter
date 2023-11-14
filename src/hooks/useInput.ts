import { useState } from "react";

export default function useInput(initV?: string) {
  const [value, setValue] = useState<string>(initV ? initV : "");

  const onChange = (e: any | string) => {
    if (typeof e === "string") setValue(e);
    else setValue(e.target.value);
  };

  return { value, onChange };
}
