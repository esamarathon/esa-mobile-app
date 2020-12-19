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

export function useHomePageGesture() {
  const stops = [150, 390];

  const spring = {
    tension: 247,
    friction: 27,
  } as const;

  const dampedSpring = {
    tension: 247,
    friction: 33,
  } as const;

  const [{value}, set] = useVelocityTrackedSpring(() => ({
    value: stops[0],
    config: spring,
  }));

  function toggleDrawer() {
    const isClosed = value.getValue() === stops[0];

    set(
      {
        value: isClosed ? stops[1] : stops[0],
        config: dampedSpring,
        immediate: false,
      },
      {},
    );
  }

  const bind = useDrag(
    ({vxvy: [, velocityY], movement: [movementX, movementY], last, memo, event}) => {
      if (event) {
        if (event.target.toString().startsWith('http')) {
          return;
        }
      }

      const isClick = last && Math.abs(movementX) + Math.abs(movementY) <= 3;
      if (isClick) {
        toggleDrawer();
        return;
      }

      if (!memo) {
        const threshold = 10;
        const isIntentionalGesture =
          Math.abs(movementY) > threshold && Math.abs(movementY) > Math.abs(movementX);

        if (!isIntentionalGesture) {
          return memo;
        }

        memo = (value.getValue() as number) - movementY;
      }

      // On drag end
      if (last) {
        const projectedEndpoint = (value.getValue() as number) + projection(velocityY);
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

      const newValue = rubberBandIfOutOfBounds(stops[0], stops[1], movementY + memo, 0.1);

      set(
        {
          value: newValue,
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
