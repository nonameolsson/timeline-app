- Root (Stack.Navigator)
  - drawerNav (Scren)
    - main (Drawer.Navigator) // rename to Drawer
      - app (Tab.Navigator)
        - timelines (Stack.Navigator)
          - timelines (Screen)
          - timeline (Screen)
          - editTimeline (Screen)
          - event (Screen)
          - editEvent (Screen)
        - people (Stack.Navigator)
          - people (Screen)
        - places (Stack.Navigator)
          - places (Screen)
      - Profile (Screen)
    - addTimeline (Screen)
    - addEvent (Screen)
  - authStack (Stack.Navigator)
    - login (Screen)