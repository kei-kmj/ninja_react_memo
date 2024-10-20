from typing import List

from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Router
from memos.schemas import MemoCreateRequest, MemoSchema, MemoUpdateRequest
from memos.models import Memo

app = NinjaAPI()
memo_router = Router()
app.add_router("/memos/", memo_router)


@memo_router.get("/", response=List[MemoSchema])
def list_memos(request):
    return Memo.objects.all()


@memo_router.get("/{memo_id}", response=MemoSchema)
def get_memo(request, memo_id: int):
    return get_object_or_404(Memo, id=memo_id)


@memo_router.post("/", response={201: MemoSchema})
def create_memo(request, memo: MemoCreateRequest):
    memo_obj = Memo.objects.create(**memo.dict())
    return 201, memo_obj


@memo_router.put("/{memo_id}", response=MemoSchema)
def update_memo(request, memo_id: int, memo: MemoUpdateRequest):
    memo_obj = get_object_or_404(Memo, id=memo_id)
    memo_obj.title = memo.title
    memo_obj.content = memo.content
    memo_obj.save()
    return memo_obj


@memo_router.delete("/{memo_id}", response={204: None})
def delete_memo(request, memo_id: int):
    memo_obj = get_object_or_404(Memo, id=memo_id)
    memo_obj.delete()
    return 204, None
