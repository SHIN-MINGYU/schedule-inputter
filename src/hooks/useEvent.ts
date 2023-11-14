export default function useEvent() {
  const sub = (eventName: string, listener: () => void) => {
    document.addEventListener(eventName, listener);
  };

  const unSub = (eventName: string, listener: () => void) => {
    document.removeEventListener(eventName, listener);
  };

  const publish = (eventName: string, detail?: any) => {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  };
  return { sub, unSub, publish };
}
