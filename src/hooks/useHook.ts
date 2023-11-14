import { useEffect, useRef } from "react";

export default function useInterval(callback: () => any, delay: number) {
  const savedCallback = useRef<() => any>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌과 클리어 세팅
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id); //바로바로 클리어를 해주기 때문에 메모리를 차지하지 않는다.
    }
  }, [delay]);
}
