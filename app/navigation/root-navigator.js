/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useStores } from "models";
import { AuthNavigator } from "./auth-navigator";
import { ModalStackScreen } from "./modal-stack";
const Stack = createStackNavigator();
const RootStack = observer(function RootStack() {
    const { userStore } = useStores();
    return (<Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: true,
    }}>
      {userStore.isLoggedIn() ? (<Stack.Screen name="modalStack" component={ModalStackScreen}/>) : (<Stack.Screen name="authStack" component={AuthNavigator}/>)}
    </Stack.Navigator>);
});
export const RootNavigator = React.forwardRef((props, ref) => {
    return (<NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>);
});
RootNavigator.displayName = "RootNavigator";
//# sourceMappingURL=root-navigator.js.map