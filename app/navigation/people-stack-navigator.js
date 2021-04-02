/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PeopleScreen } from "screens";
import { TopBar } from "components";
const PeopleStack = createStackNavigator();
export const PeopleStackNavigator = () => {
    return (<PeopleStack.Navigator initialRouteName="people" headerMode="screen" screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        header: ({ scene, previous, navigation, ...props }) => (<TopBar scene={scene} previous={previous} navigation={navigation} {...props}/>),
    }}>
      <PeopleStack.Screen name="people" component={PeopleScreen} options={() => ({ headerShown: true, headerTitle: "People" })}/>
    </PeopleStack.Navigator>);
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
//# sourceMappingURL=people-stack-navigator.js.map