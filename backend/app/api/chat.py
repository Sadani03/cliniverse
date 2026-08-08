from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from app.core.auth import get_current_user
from app.models.user import User
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
)
from app.services.openai_service import (
    generate_nova_response,
)


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "",
    response_model=ChatResponse,
)
def chat_with_nova(
    payload: ChatRequest,
    current_user: User = Depends(
        get_current_user
    ),
):
    try:
        response = generate_nova_response(
            payload.message
        )

        return ChatResponse(
            response=response
        )

    except Exception as error:
        print(
            "OpenAI chat error:",
            error,
        )

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                "Nova is temporarily unable to respond. "
                "Please try again."
            ),
        ) from error