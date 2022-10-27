
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
// 

const client = createClient({
    publicApiKey: "pk_dev_66B7SMWJvCwaVIV6XfxStyoi",
});


export const { RoomProvider, useOthers, useUpdateMyPresence } = createRoomContext(client);