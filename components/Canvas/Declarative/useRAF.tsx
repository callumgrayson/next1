import React, { useEffect, useRef } from "react";

function useRAF({
  callback,
  isRunning,
}: {
  callback: () => void;
  isRunning: boolean;
}) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (isRunning) {
      let id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
    }
  }, [isRunning]);
}

export default useRAF;
