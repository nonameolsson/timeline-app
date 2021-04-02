import * as React from "react";
import { ScrollView, View } from "react-native";
const ROOT = { flex: 1 };
export function Story(props) {
    return (<View style={ROOT}>
      <ScrollView>{props.children}</ScrollView>
    </View>);
}
//# sourceMappingURL=story.js.map