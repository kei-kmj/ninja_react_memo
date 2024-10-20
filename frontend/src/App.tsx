import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {MemoDetails} from "./MemoDetails.tsx";
import {MemoList} from "./components/MemoList.tsx";
import {CreateMemo} from "./components/CreateMemo.tsx";

export type Memo = {
  id: number,
  title: string,
  content: string,
  created_at: Date,
  updated_at: Date,
}

export const App = () => {
  const [memos, setMemos] = useState<Memo[]>([])
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null)

  useEffect(() => {
      axios.get('http://localhost:8000/api/memos')
        .then(res => {
          const data = res.data.map((memo: Memo) => ({
              ...memo,
              created_at: new Date(memo.created_at),
              updated_at: new Date(memo.updated_at),
            })
          )
          setMemos(data)
        })
        .catch(error => {
            console.error(error)
          }
        )
    }
    , [])

  const handleMemoCreated = (newMemo) => {
    setMemos([...memos, newMemo]);
  };

  const handleMemoClick = (memo: Memo) => {
    setSelectedMemo(memo)
  }

  return (
    <>
      <h1>Memo App</h1>
      <CreateMemo onMemoCreated={handleMemoCreated}/>
      <div style={{display: 'flex'}}>
        {/* 左側のメモ一覧 */}
        <div style={{padding: '10px', borderRight: '1px solid #ddd'}}>
          <MemoList memos={memos} handleMemoClick={handleMemoClick}/></div>

        {/* メモの詳細表示 */}
        <MemoDetails memo={selectedMemo}/>
      </div>
    </>
  );
}