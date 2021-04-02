import { useCallback, useState, useEffect, useRef } from "react"
import { BackHandler } from "react-native"
export const RootNavigation = {
  navigate(name) {
    name // eslint-disable-line no-unused-expressions
  },
  goBack() {},
  resetRoot(state) {},
  getRootState() {
    return {}
  },
}
export const setRootNavigation = (ref) => {
  for (const method in RootNavigation) {
    RootNavigation[method] = (...args) => {
      if (ref.current) {
        return ref.current[method](...args)
      }
    }
  }
}
/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(state) {
  const route = state.routes[state.index]
  // Found the active route -- return the name
  if (!route.state) return route.name
  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state)
}
/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(ref, canExit) {
  const canExitRef = useRef(canExit)
  useEffect(() => {
    canExitRef.current = canExit
  }, [canExit])
  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      const navigation = ref.current
      if (navigation == null) {
        return false
      }
      // grab the current route
      const routeName = getActiveRouteName(navigation.getRootState())
      // are we allowed to exit?
      if (canExitRef.current(routeName)) {
        // let the system know we've not handled this event
        return false
      }
      // we can't exit, so let's turn this into a back action
      if (navigation.canGoBack()) {
        navigation.goBack()
        return true
      }
      return false
    }
    // Subscribe when we come to life
    BackHandler.addEventListener("hardwareBackPress", onBackPress)
    // Unsubscribe when we're done
    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
  }, [ref])
}
/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage, persistenceKey) {
  const [initialNavigationState, setInitialNavigationState] = useState()
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(true)
  const routeNameRef = useRef()
  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = getActiveRouteName(state)
    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.tron.log(currentRouteName)
    }
    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName
    // Persist state to storage
    storage.save(persistenceKey, state)
  }
  const restoreState = useCallback(async () => {
    try {
      const state = await storage.load(persistenceKey)
      if (state) setInitialNavigationState(state)
    } finally {
      setIsRestoringNavigationState(false)
    }
  }, [persistenceKey, storage])
  useEffect(() => {
    if (isRestoringNavigationState) restoreState()
  }, [isRestoringNavigationState])
  return { onNavigationStateChange, restoreState, initialNavigationState }
}
//# sourceMappingURL=navigation-utilities.js.map
