
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
            message = await websocket.receive_text()

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