import {Memo} from "./App.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";


export const MemoDetails = ({memo}: { memo: Memo | null }) => {
  const [editMode, setEditMode] = useState(false);
  const [memoState, setMemoState] = useState({
    title: memo?.title || '',
    content: memo?.content || '',
  });

  useEffect(() => {
    if (memo) {
      setMemoState({
        title: memo.title,
        content: memo.content,
      });
    }
  }, [memo]);

  const onUpdateMemo = () => {
    if (memo) {
      axios.put(`http://localhost:8000/api/memos/${memo.id}`, {
        title: memoState.title,
        content: memoState.content,
      })
        .then(response => {
          if (response.status === 200) {
            alert('Memo updated successfully!');
            setEditMode(false);
          } else {
            alert('There was an error updating the memo!');
          }
        })
        .catch(error => {
          console.error('There was an error updating the memo!', error);
        });
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemoState({
      ...memoState,
      [e.target.name]: e.target.value,
    });
  };

  const onDeleteMemo = () => {
    if (memo) {
      const confirmDelete = window.confirm(`Are you sure you want to delete the memo: ${memo.title}?`);
      if (confirmDelete) {
        axios.delete(`http://localhost:8000/api/memos/${memo.id}`)
          .then(response => {
            if (response.status === 204) {
              alert('Memo deleted successfully!');
            } else {
              alert('There was an error deleting the memo!');
            }
          })
          .catch(error => {
            console.error('There was an error deleting the memo!', error);
          });

      }
    }
  }
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div style={{width: "100%", padding: "10px", maxWidth: "600px"}}>
        {memo ? (
          <div>
            {editMode ? (
              <form onSubmit={onUpdateMemo}>
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={memoState.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Content:</label>
                  <textarea
                    name="content"
                    value={memoState.content}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Update Memo</button>
              </form>
            ) : (
              <>
                <h3>{memo.title}</h3>
                <p>{memo.content}</p>
                <p>Created at: {memo.created_at.toLocaleString()}</p>
                <p>Updated at: {memo.updated_at.toLocaleString()}</p>
              </>
            )}
          </div>
        ) : (
          <p>Select a memo to see details.</p>
        )}
      </div>

      <div style={{textAlign: "center", marginTop: "10px"}}>
        {editMode ? (
          <button onClick={() => setEditMode(false)}>Cancel</button>
        ) : (
          <button onClick={() => setEditMode(true)} style={{marginRight: "10px"}}>
            Edit
          </button>
        )}
        <button onClick={onDeleteMemo}>Delete</button>
      </div>
    </div>
  );
};