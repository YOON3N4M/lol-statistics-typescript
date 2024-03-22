type EventName = keyof WindowEventMap;
type Fn<EventType> = (e: EventType) => void;

export class DebounceEvent<EventType> {
  eventName: EventName;
  fn: Fn<EventType>;
  timer: ReturnType<typeof setTimeout> | null;
  TIME: number;

  constructor(eventName: EventName, fn: Fn<EventType>, time?: number) {
    this.eventName = eventName;
    this.fn = fn;
    this.timer = null;
    this.TIME = time || 100;

    this.init();
  }

  init() {
    window.addEventListener(this.eventName, this.debouncing as EventListener);
  }

  debouncing = (e: EventType) => {
    // debouncing
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      this.fn(e);
    }, this.TIME);
  };

  removeEventListeners() {
    window.removeEventListener(
      this.eventName,
      this.debouncing as EventListener
    );
  }
}
