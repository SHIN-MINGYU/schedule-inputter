import { useState } from "react";

export default function useInput() {
  const [value, setValue] = useState<string>("");

  const onChange = (e: any | string) => {
    if (typeof e === "string") setValue(e);
    else setValue(e.target.value);
  };

  return { value, onChange };
}
