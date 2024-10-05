import { Link, MetaProvider, Stylesheet, Title } from "@solidjs/meta";
import RoomMain from "./components/room/main";
import "./styles/_index.scss";
import {
  createComputed,
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  onCleanup,
  Suspense,
  Switch,
} from "solid-js";
import Loading from "./components/loading";
import { APP_FETCH_TO } from "./consts";
import { createLocalStore } from "./lib/config";

function checkExistsInSlice(arr: RoomStruct[], id: string) {
  return arr.some((v) => v.id === id);
}

function checkExistsInDict(dict: { [id: string]: boolean }, arr: RoomStruct[]) {
  return arr.some((v) => dict[v.id] !== undefined);
}

function setOrRemoveIsOpened(
  dict: { [id: string]: boolean },
  id: string,
  isExistsInArr: boolean,
  // isExistsInDict: boolean,
  value: boolean
) {
  let tempdict = dict;
  if (!isExistsInArr) {
    delete tempdict[id];
  } else {
    tempdict[id] = value;
  }

  return tempdict;
}

export default () => {
  const fetchGroups = async () => {
    const res = await fetch(APP_FETCH_TO);
    const j = await res.json();
    return j as RoomStruct[];
  };

  const [store, setStore] = createLocalStore("config", { defaultOpen: false });

  const [room_data, { refetch }] = createResource(fetchGroups);
  const [roomDataFinalized, setRoomDataFinalized] = createSignal<RoomStruct[]>(
    []
  );
  const [roomPlayerCount, setRoomPlayerCount] =
    createSignal<RoomPlayerCountStruct>({ player: 0, room: 0 });
  const [roomPanelOpened, setRoomPanelOpened] = createSignal<{
    [id: string]: boolean;
  }>({});
  const [searchFriendCode, setSearchFriendCode] = createSignal("");

  const timer = setInterval(async () => {
    try {
      await refetch();
      setRoomDataFinalized(room_data()!);

      let rooms = roomDataFinalized().length;
      let players = 0;
      roomDataFinalized().forEach((v) => {
        players += Object.values(v.players).length;
      });

      setRoomPlayerCount({ player: players, room: rooms });
    } catch (e) {
      console.error(e);
    }
  }, 30000);

  onCleanup(() => {
    clearInterval(timer);
  });

  createEffect(() => {
    try {
      if (room_data.state === "ready") {
        const tempRoomResort = room_data().sort(
          (a, b) =>
            +Object.values(b.players).some((v) => v.fc === searchFriendCode()) -
            +Object.values(a.players).some((v) => v.fc === searchFriendCode())
        );
        setRoomDataFinalized(room_data());

        let rooms = roomDataFinalized().length;
        let players = 0;
        roomDataFinalized().forEach((v) => {
          players += Object.values(v.players).length;
        });

        if (store.defaultOpen) {
          roomDataFinalized().forEach((v) => {
            setOrRemoveIsOpened(
              roomPanelOpened(),
              v.id,
              checkExistsInSlice(room_data(), v.id),
              true
            );
          });
        }

        setRoomPlayerCount({ player: players, room: rooms });
      }
    } catch (e) {
      console.error(e);
    }
  });

  createEffect(() => {
    try {
      const tempRoomResort = room_data()!.sort(
        (a, b) =>
          +Object.values(b.players).some((v) => v.fc === searchFriendCode()) -
          +Object.values(a.players).some((v) => v.fc === searchFriendCode())
      );
      setRoomDataFinalized(tempRoomResort);
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <MetaProvider>
      <Title>古典 (Retro Rewind stats) (pre-0.1.1)</Title>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <Stylesheet href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Quicksand:wght@300..700&family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&display=swap" />
      <div class="_ribbon">Pre-0.1</div>
      <main>
        {/* <input
          type="text"
          placeholder="Type your friend code (e.g. 0000-0000-0000)"
          value={searchFriendCode()}
          onChange={(v) => {
            setSearchFriendCode(v.currentTarget.value);
          }}
        ></input> */}
        <div class="player_counts">
          {roomPlayerCount().player} Active Players | {roomPlayerCount().room}{" "}
          Rooms
        </div>
        <Suspense fallback={<Loading />}>
          <Switch fallback={<Loading />}>
            <Match when={room_data.error}>
              <div>{room_data.error.message}</div>
            </Match>
            <Match when={roomDataFinalized().length !== 0}>
              <For each={roomDataFinalized() as RoomStruct[]}>
                {(item) => (
                  <RoomMain
                    id={item.id}
                    type={item.type as RoomType}
                    region={item.rk}
                    canJoin={!item.suspend}
                    player_length={Object.values(item.players).length}
                    defaultOpen={
                      roomPanelOpened()[item.id] !== undefined &&
                      roomPanelOpened()[item.id]
                    }
                    players={item.players}
                    isClicked={(v) => {
                      setOrRemoveIsOpened(
                        roomPanelOpened(),
                        item.id,
                        checkExistsInSlice(room_data()!, item.id),
                        v
                      );
                    }}
                  >
                    {/* <For each={Object.values(item.players)}>
                      {(item) => <div>{item.name}</div>}
                    </For> */}
                    <></>
                  </RoomMain>
                )}
              </For>
            </Match>
            <Match
              when={
                room_data.state === "ready" && roomDataFinalized().length <= 0
              }
            >
              <div>There is no room active.</div>
            </Match>
          </Switch>
        </Suspense>
        {/* {[...Array(20)].map(() => (
          <RoomMain
            defaultOpen={true}
            id={"000000"}
            type={"anybody"}
            canJoin={false}
            region="vs_10"
            player_length={0}
          >
            <></>
          </RoomMain>
        ))} */}
        {/* <Tooltip id={"000000"} /> */}
      </main>
      <footer>
        <a
          href="https://rz-public.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Rz
        </a>
        <a
          href="http://zplwii.xyz/api/groups"
          target="_blank"
          rel="noopener noreferrer"
        >
          Api Endpoint
        </a>
        <a
          href="https://github.com/expiteRz/RetroRewindStats"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </MetaProvider>
  );
};
