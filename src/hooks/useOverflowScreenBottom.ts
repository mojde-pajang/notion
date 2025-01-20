import { useEffect, useRef, useState } from "react";

function useOverflowScreenBottom() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [overFlow, setOverFlow] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      const { bottom } = elementRef.current.getBoundingClientRect();
      const { innerHeight } = window;
      setOverFlow(bottom > innerHeight);
    }
  }, []);
  return { overFlow, elementRef };
}

export default useOverflowScreenBottom;
