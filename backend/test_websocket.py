import asyncio
import base64
import json

import websockets


async def test_websocket():
    uri = "ws://127.0.0.1:8000/api/ws"

    async with websockets.connect(uri) as websocket:
        print("Connected to Auralis WebSocket")

        # Receive connection message
        response = await websocket.recv()
        print("Server:", response)

        # Test ping
        await websocket.send(json.dumps({
            "type": "ping"
        }))

        response = await websocket.recv()
        print("Server:", response)

        # Request current session state
        await websocket.send(json.dumps({
            "type": "session_state"
        }))

        response = await websocket.recv()
        print("Server:", response)

        # Create a small fake audio payload
        fake_audio = b"\x00\x01\x02\x03" * 256

        audio_base64 = base64.b64encode(
            fake_audio
        ).decode("utf-8")

        # Send audio chunk
        await websocket.send(json.dumps({
            "type": "audio_chunk",
            "data": audio_base64
        }))

        response = await websocket.recv()
        print("Server:", response)

        # Request session state again
        await websocket.send(json.dumps({
            "type": "session_state"
        }))

        response = await websocket.recv()
        print("Server:", response)


if __name__ == "__main__":
    asyncio.run(test_websocket())