import { EffectCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { reaction } from "mobx";

/**
 * useEffect combined with mobx stores. When the effect executes, the latest value from
 * the store will be sent as argument to the effect function
 * @param expression - expression used as reaction expression. The return value from
 *                     this function will be send as parameter to the effect function
 * @param effectCallback - effect function, as in useEffect. But it takes the return
 *                   value from expression as an argument. If a function is returned,
 *                   it will be executed on cleanup
 * @param effectDeps - Array with dependencies. If any of these changes, the effect
 *                     will be executed.
 */
export function useEffectWithStore<T>(
  expression: () => T,
  effectCallback: EffectCallbackWithStore<T>,
  effectDeps: unknown[]
) {
  const paramsRef = useRef<T>();
  const effectCallbackRef = useRef<EffectCallbackWithStore<T>>();

  // Update collect and update values from the store every time they change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    () =>
      reaction(expression, (params) => (paramsRef.current = params), {
        fireImmediately: true,
      }),
    []
  );

  // Update the callback function if it changes (will occure every update)
  useEffect(() => {
    effectCallbackRef.current = effectCallback;
  }, [effectCallback]);

  // the "normal" effect
  useEffect(() => {
    if (effectCallbackRef.current && paramsRef.current) {
      return effectCallbackRef.current(paramsRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, effectDeps);
}

type EffectCallbackWithStore<T = unknown> = (
  injects: T
) => ReturnType<EffectCallback>;

/**
 * When a screen gets focused the title makes sure always the latest title is used
 * @param title - Text to be used as the title
 */
export function useTitle(title?: string) {
  const navigation = useNavigation();

  useFocusEffect(() => {
    if (!title) return;

    navigation.setOptions({
      title,
    });
  });
}

type HeaderButtons = {
  left?: () => JSX.Element;
  right?: () => JSX.Element;
};

export const useHeaderButtons = ({ left, right }: HeaderButtons) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (!left && !right) {
      return;
    }

    navigation.setOptions({
      headerLeft: left,
      headerRight: right,
    });
  }, [left, right, navigation]);
};
