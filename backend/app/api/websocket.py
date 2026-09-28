import base64

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.services.audio_session import audio_session_manager


router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    session = audio_session_manager.create_session()
    session.start()

    try:
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "message": "Auralis real-time channel established",
            "session": session.to_dict(),
        })

        while True:
            message = await websocket.receive_json()

            message_type = message.get("type")

            if message_type == "audio_chunk":
                audio_data = message.get("data", "")

                try:
                    decoded_audio = base64.b64decode(audio_data)
                except Exception:
                    await websocket.send_json({
                        "type": "error",
                        "message": "Invalid base64 audio data",
                    })
                    continue

                session.register_audio_chunk(
                    len(decoded_audio)
                )

                await websocket.send_json({
                    "type": "audio_chunk_ack",
                    "session_id": session.session_id,
                    "chunk_size": len(decoded_audio),
                    "chunks_received": session.audio_chunks_received,
                    "bytes_received": session.audio_bytes_received,
                })

            elif message_type == "ping":
                await websocket.send_json({
                    "type": "pong",
                    "session_id": session.session_id,
                })

            else:
                await websocket.send_json({
                    "type": "echo",
                    "message": message,
                    "session_id": session.session_id,
                })

    except WebSocketDisconnect:
        session.stop()
        audio_session_manager.remove_session(session.session_id)

        print(
            f"Auralis session disconnected: {session.session_id}"
        )