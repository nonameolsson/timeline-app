import { StyleSheet } from "react-native"

export const drawerContentStyles = StyleSheet.create({
  avatar: {
    flexDirection: "row",
    marginTop: 15,
  },
  bottomDrawerSection: {
    borderTopWidth: 1,
    marginBottom: 15,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  section: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },
  userInfo: {
    flexDirection: "column",
    marginLeft: 15,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  wrapper: {
    flex: 1,
  },
})
