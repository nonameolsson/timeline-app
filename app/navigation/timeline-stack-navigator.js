/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EventScreen, EditEventScreen, TimelinesScreen, TimelineScreen, EditTimelineScreen, } from "screens";
import { TopBar } from "components";
const TimelineStack = createStackNavigator();
export const TimelineStackScreen = () => {
    return (<TimelineStack.Navigator initialRouteName="timelines" headerMode="screen" screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        header: ({ scene, previous, navigation, ...props }) => (<TopBar scene={scene} previous={previous} navigation={navigation} {...props}/>),
    }}>
      <TimelineStack.Screen name="timelines" component={TimelinesScreen} options={() => ({ headerShown: true, headerTitle: "Timeline" })}/>
      <TimelineStack.Screen name="timeline" component={TimelineScreen} options={({ route }) => ({
        headerShown: true,
        headerTitle: route.params.title || "Timeline",
    })}/>
      <TimelineStack.Screen name="editTimeline" component={EditTimelineScreen} options={{ headerTitle: "Edit" }}/>
      <TimelineStack.Screen name="event" component={EventScreen} options={({ route }) => ({
        headerTitle: route.params.title || "Event",
    })}/>
      <TimelineStack.Screen name="editEvent" component={EditEventScreen} options={{ headerTitle: "Edit" }}/>
    </TimelineStack.Navigator>);
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
//# sourceMappingURL=timeline-stack-navigator.js.map