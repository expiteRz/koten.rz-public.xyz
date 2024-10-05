import { Show } from "solid-js";

export default ({ player }: { player: RoomPlayerStruct }) => {
  if (player.mii !== undefined)
    return player.mii.map((mii) => (
      <>
        <hr />
        <div class="player_item">
          <h4>{mii.name}</h4>
          <span id="fc">{player.fc}</span>
          <Show when={player.ev !== undefined && player.ev !== null}>
            <span id="rating">{player.ev} VR</span>
          </Show>
        </div>
      </>
    ));
  else
    return (
      <>
        <hr />
        <div class="player_item">
          <h4>{player.name}</h4>
          <span id="fc">{player.fc}</span>
          <Show when={player.ev !== undefined && player.ev !== null}>
            <span id="rating">{player.ev} VR</span>
          </Show>
        </div>
      </>
    );
};
