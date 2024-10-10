import { createSignal, Match, Show, Switch } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import Player from "./player";

export default (props: {
  children: JSX.Element;
  defaultOpen: boolean;
  id: string;
  type: RoomType;
  region: string;
  player_length: number;
  canJoin?: boolean;
  players?: { [id: string]: RoomPlayerStruct };
  isClicked?: (v: boolean) => void;
}) => {
  const [show, setShow] = createSignal(props.defaultOpen);
  return (
    <div class="_panel" id={"room_" + props.id}>
      <div
        class="info"
        onClick={() => {
          setShow((v) => !v);
          props.isClicked!(show());
        }}
      >
        {props.type === "anybody" ? (
          <svg
            class="room_indicator"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <title>Public room</title>
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>
        ) : (
          <svg
            class="room_indicator"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <title>Private room</title>
            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
          </svg>
        )}
        <div style={{ display: "flex", "flex-direction": "column" }}>
          <h3>{props.id}</h3>
          {props.type === "anybody" ? (
            <div class="region" title={props.region}>
              {props.region === "vs_10"
                ? "Retro CTWW"
                : props.region === "bt_10"
                ? "Retro Battle"
                : props.region === "vs"
                ? "Retro TTs Online"
                : "Unknown"}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div class="detail">
          <div>
            <svg
              // class="player_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={12}
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>{" "}
            <span>{props.player_length}</span>
          </div>
          {props.canJoin ? (
            <svg
              class="player_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{ "margin-right": 0, "margin-left": "auto" }}
            >
              <title>Can join</title>
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
          ) : (
            <svg
              class="player_icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style={{ "margin-right": 0, "margin-left": "auto" }}
            >
              <title>Cannot join</title>
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          )}
        </div>
        <svg
          classList={{ opened: show() }}
          width={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </div>
      <Switch>
        <Match when={show()}>
          {props.players !== undefined && props.players !== null ? (
            Object.values(props.players!).map((v) => {
              return <Player player={v} />;
            })
          ) : (
            <></>
          )}
        </Match>
      </Switch>
    </div>
  );
};
