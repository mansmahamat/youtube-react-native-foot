// @ts-nocheck
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  Image,
  ListItem,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YGroup,
  YStack
} from "tamagui";

import { fetchTeamById } from "../../api/teams";
import { MyStack } from "../../components/MyStack";

export default function User() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTeam = async () => {
      const team = await fetchTeamById(params.teamId);

      setData(team);

      setIsLoading(false);
    };

    fetchTeam();
  }, [params.teamId]);

  return (
    <MyStack justifyContent="flex-start">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `Team ${params.teamId}'s `,
          headerLeft() {
            return (
              <Button
                mr="$2.5"
                onPress={router.back}
              >
                <MaterialCommunityIcons name="arrow-left" />
              </Button>
            );
          }
        }}
      />
      <ScrollView>
        {loading ? (
          <YStack
            padding="$3"
            space="$4"
            alignItems="center"
          >
            <Spinner
              size="large"
              color="$orange10"
            />
          </YStack>
        ) : (
          <YGroup
            alignSelf="center"
            bordered
            size="$4"
          >
            {data?.map((item, index) => (
              <YGroup.Item key={index}>
                <ListItem hoverTheme>
                  <XStack
                    flex={1}
                    space="$2"
                    borderWidth={2}
                    borderColor="$color"
                    borderRadius="$4"
                    padding="$2"
                    alignItems="center"
                  >
                    <Image
                      source={{
                        uri: item.player.image_path,
                        width: 30,
                        height: 30
                      }}
                    />
                    <Text>{item.player.name}</Text>
                    <Text>no {item.jersey_number}</Text>
                  </XStack>
                </ListItem>
              </YGroup.Item>
            ))}
          </YGroup>
        )}
      </ScrollView>
    </MyStack>
  );
}
