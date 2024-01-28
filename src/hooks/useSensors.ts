import {
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors as useSensorsCore,
} from "@dnd-kit/core";

const useSensors = () => {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  // A normal swipe on mobile should scroll, even on a handle. Hold for 200ms to pick up an item
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 21, delay: 200, tolerance: 20 },
  });
  const sensors = useSensorsCore(touchSensor, mouseSensor);
  return sensors;
};

export default useSensors;
