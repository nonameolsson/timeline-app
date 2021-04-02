/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PlacesScreen } from "screens";
import { TopBar } from "components";
const PlacesStack = createStackNavigator();
export const PlacesStackNavigator = () => {
    return (<PlacesStack.Navigator initialRouteName="places" headerMode="screen" screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        header: ({ scene, previous, navigation, ...props }) => (<TopBar scene={scene} previous={previous} navigation={navigation} {...props}/>),
    }}>
      <PlacesStack.Screen name="places" component={PlacesScreen} options={() => ({ headerShown: true, headerTitle: "Places" })}/>
    </PlacesStack.Navigator>);
};
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
// const exitRoutes = ["welcome"]
// export const canExit = (routeName: string) => exitRoutes.includes(routeName)
//# sourceMappingURL=places-stack-navigator.js.map