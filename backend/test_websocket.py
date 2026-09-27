import asyncio
import websockets


async def test_websocket():
    uri = "ws://127.0.0.1:8000/api/ws"

    async with websockets.connect(uri) as websocket:
        print("Connected to Auralis WebSocket")

        response = await websocket.recv()
        print("Server:", response)

        await websocket.send("Hello Auralis")

        response = await websocket.recv()
        print("Server:", response)


if __name__ == "__main__":
    asyncio.run(test_websocket())