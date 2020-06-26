import * as React from "react"
import { Button, View } from "react-native"
import { useLazyQuery } from "@apollo/react-hooks"

import { Text } from "../text/text"
import { GET_ALL_TIMELINES } from "../../queries/timeline"

interface Props {
  title: string
}

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function GraphQL(props: Props) {
  const { title } = props
  const [getTimelines, { loading, error, data }] = useLazyQuery(GET_ALL_TIMELINES, {
    fetchPolicy: "network-only",
  })

  if (loading) return <Text>Loading...</Text>

  if (error) return <Text>Error</Text>

  return (
    <View>
      <Text>{title}</Text>
      {data && data.timelines && data.timelines.length > 0 &&
        data.timelines.map(timeline => (
          <Text style={{ color: "white" }} key={timeline.id}>
            {timeline.title}
          </Text>
        ))
      }
      <Button title="Get timelines" onPress={() => getTimelines()} />
    </View>
  )
}
