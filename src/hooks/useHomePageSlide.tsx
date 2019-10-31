import {useDrag} from 'react-use-gesture';
import {
  rubberBandIfOutOfBounds,
  findNearestNumberInArray,
  projection,
} from '../services/AnimationService';
import {useSpring} from 'react-spring';

type ValueConfig = {value: number};
type Spring = {tension: number; friction: number};

const useVelocityTrackedSpring = (initialConfigFunc: () => ValueConfig) => {
  const initialConfig = initialConfigFunc();
  const [springVals, set] = useSpring(initialConfigFunc);
  const [{velocityTracker}, setVelocityTracker] = useSpring(() => ({
    velocityTracker: initialConfig.value,
    ...initialConfig,
  }));

  // you can disable the tracking or setting of velocity by providing options in the second argument
  const wrappedSet = (
    data: ValueConfig & {immediate?: boolean; config?: Spring},
    {
      skipTrackVelocity,
      skipSetVelocity,
    }: {skipTrackVelocity?: boolean; skipSetVelocity?: boolean} = {},
  ) => {
    // update velocity tracker
    const velocityTrackerArgs: {
      config?: Spring;
      velocityTracker?: number;
    } = {config: data.config};
    if (data.value && !skipTrackVelocity) {
      velocityTrackerArgs.velocityTracker = data.value;
    }
    setVelocityTracker(velocityTrackerArgs);

    // update actual spring
    if (data.immediate) {
      set(data);
      return;
    }

    set({
      ...data,
      config: {
        ...data.config,
        velocity: !skipSetVelocity && (velocityTracker as any).lastVelocity,
      },
    });
  };

  return [springVals, wrappedSet] as [typeof springVals, typeof wrappedSet];
};
export function useHomePageAnimation() {
  const stops = [150, 550];

  const spring = {
    tension: 247,
    friction: 27,
  };

  const [{value}, set] = useVelocityTrackedSpring(() => ({
    value: stops[0],
    config: spring,
  }));

  function setDrawerOpen() {
    const dampedSpring = {
      tension: 247,
      friction: 33,
    };

    set(
      {
        value: value.getValue() === stops[0] ? stops[1] : stops[0],
        config: dampedSpring,
        immediate: false,
      },
      {},
    );
  }

  const threshold = 10;
  const bind = useDrag(
    ({vxvy: [, velocityY], movement: [movementX, movementY], last, memo, event}) => {
      if (event) {
        event.preventDefault();
      }

      const drawerIsOpen = value.getValue() === stops[1];

      const isClick = last && Math.abs(movementX) + Math.abs(movementY) <= 3 && !drawerIsOpen;

      if (isClick) {
        setDrawerOpen();
        return memo;
      }

      if (!memo) {
        const isIntentionalGesture =
          Math.abs(movementY) > threshold && Math.abs(movementY) > Math.abs(movementX);

        if (!isIntentionalGesture) {
          return memo;
        }

        memo = value.getValue() - movementY;
      }

      // On drag end
      if (last) {
        const projectedEndpoint = value.getValue() + projection(velocityY);
        const point = findNearestNumberInArray(projectedEndpoint, stops);

        set(
          {
            value: point,
            immediate: false,
            config: spring,
          },
          {},
        );

        return memo;
      }

      const newY = rubberBandIfOutOfBounds(
        stops[0],
        stops[stops.length - 1],
        movementY + memo,
        0.1,
      );

      set(
        {
          value: newY,
          immediate: true,
        },
        {},
      );

      return memo;
    },
    {
      event: {passive: false},
    },
  );

  // really dont know how to type this
  return {animatedValue: value as any, bind, stops};
}
