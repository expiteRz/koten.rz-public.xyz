import { APP_FETCH_TO } from "~/consts";

export const fetchGroups = async () => {
    const res = await (await fetch(APP_FETCH_TO)).json();
    return res as CustomRoomData;
};

export const getSpecificRoom = (fetched: CustomRoomData, filter: string) => {
    const rooms = fetched.data;
    if (filter.length === 6) {
        const rsrv = rooms.filter(v => v.id === filter.toUpperCase());
        return rsrv.length > 0 ? rsrv[0] : null;
    } else if (filter.length === 14) {
        const rsrv = rooms.filter(v => {
            const players = v.players;
            return Object.values(players).filter(v => v.fc === filter).length > 0;
        })
        return rsrv.length > 0 ? rsrv[0] : null;
    } else {
        return null;
    }
};