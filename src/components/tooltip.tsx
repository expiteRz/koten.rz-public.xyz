import { Portal } from "solid-js/web";

export default ({id}: { id: string }) => (
  <Portal mount={document.querySelector("room_" + id) as Node}>
    <div>Test</div>
  </Portal>
);
