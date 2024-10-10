/// <reference types="@solidjs/start/env" />
declare type CustomRoomData = {
    last_updated: string;
    data: RoomStruct[];
};

declare type RoomStruct = {
    id: string;
    game: string;
    created: string;
    type: string;
    suspend: boolean;
    host: string;
    rk: string;
    players: { [id: string]: RoomPlayerStruct; };
};

declare type RoomPlayerStruct = {
    count: string;
    pid: string;
    name: string;
    /* compress per joined player:
    0 = not connected
    1 = connecting
    2 = connected!!!
    3 = FAILURE */
    conn_map: string;
    conn_fail: string;
    suspend: string;
    fc: string;
    ev: string;
    eb: string;
    mii: RoomPlayerMiiStruct[];
};

declare type RoomPlayerMiiStruct = {
    data: string;
    name: string;
};

declare type RoomType = "anybody" | "private";

declare type RoomPlayerCountStruct = { player: number; room: number; };

declare type SessionConfig = { defaultOpen: boolean; };

declare module "bun" {
    interface Env {
        readonly APP_NAME: string;
        readonly APP_DISPLAY: string;
        readonly APP_FETCH_TO: string;
    }
}