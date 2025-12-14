import { useEffect, useRef } from "react";

const useAnimationFrame = (
  callback: (timestamp: number) => void,
  running: boolean
) => {
  const savedCallback = useRef(callback); // 传进来的callback
  const requestId = useRef(0); // 当前正在执行的requestId

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick(timestamp: number) {
      savedCallback.current(timestamp);
      if (running) {
        // 当running为true时，才启动下一个，并拿到最新的requestId
        requestId.current = requestAnimationFrame(tick);
      }
    }

    if (running) {
      requestId.current = requestAnimationFrame(tick);

      return () => cancelAnimationFrame(requestId.current);
    }
  }, [running]);
};

export default useAnimationFrame;
