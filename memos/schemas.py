from ninja import ModelSchema
from memos.models import Memo


class MemoCreateRequest(ModelSchema):
    class Meta:
        model = Memo
        fields = ('title', 'content')


class MemoUpdateRequest(MemoCreateRequest):
    class Meta:
        model = Memo
        fields = 'created_at'


class MemoSchema(ModelSchema):
    class Meta:
        model = Memo
        fields = '__all__'
