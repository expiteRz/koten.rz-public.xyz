import { redirect, useLocation } from "@solidjs/router";
import "../styles/_overlay/_index.scss";
import { fetchGroups, getSpecificRoom } from "~/lib/fetch";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  onCleanup,
  Suspense,
  Switch,
} from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import { APP_TITLE } from "~/consts";

export default () => {
  const loc = useLocation();
  console.log(`friend code: ${loc.query["fc"]}\nroom id: ${loc.query["room"]}`);

  const [room_data, { refetch }] = createResource(fetchGroups);
  const [targetRoom, setTargetRoom] = createSignal<RoomStruct>();

  const fetch_room = () => {
    return getSpecificRoom(
      room_data()!,
      loc.query["fc"] ?? loc.query["room"] ?? ""
    );
  };

  const timer = setInterval(async () => {
    try {
      await refetch();
      setTargetRoom(fetch_room()!);
    } catch (e) {
      console.error(e);
    }
  }, 30000);

  onCleanup(() => clearInterval(timer));

  createEffect(() => {
    try {
      if (room_data.state === "ready") {
        setTargetRoom(fetch_room()!);
      }
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <MetaProvider>
      <Title>
        Overlay of{" "}
        {loc.query["fc"] !== undefined
          ? `Player: ${loc.query["fc"]}`
          : loc.query["room"] !== undefined
          ? `Room: ${loc.query["room"]}`
          : ""}
        {" - "}
        {APP_TITLE}
      </Title>
      <main>
        <Switch fallback={<NoRoomTemplate />}>
          <Match when={targetRoom() !== undefined && targetRoom() !== null}>
            <For each={Object.values(targetRoom()?.players!)}>
              {(v) => (
                <div class="player_root">
                  <div class="player">
                    <span
                      classList={{
                        name: true,
                        no_name:
                          v.name === "no name" /* temporarily implementation */,
                      }}
                    >
                      {v.name === "no name" ? "Player" : v.name}
                    </span>
                  </div>
                  {(v.ev !== undefined && v.ev !== null) ||
                  (v.eb !== undefined && v.eb !== null) ? (
                    <div class="rating">
                      {v.ev ?? v.eb}{" "}
                      {v.ev !== undefined && v.ev !== null ? (
                        <span>VR</span>
                      ) : v.eb !== undefined && v.eb !== undefined ? (
                        <span>BR</span>
                      ) : (
                        <></>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </For>
          </Match>
        </Switch>
      </main>
    </MetaProvider>
  );
};

const NoRoomTemplate = () => (
  <div class="no_room_indicator">No room detected</div>
);
