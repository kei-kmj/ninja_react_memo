import {useState} from "react";
import axios from "axios";

export const CreateMemo = ({onMemoCreated}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const toggleForm = (): void => {
    setShowForm(!showForm);
  };
  const handleFormSubmit = (e): void => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/memos/', {
      title: title,
      content: content,
    })
      .then(response => {
        onMemoCreated(response.data);
        setTitle('');
        setContent('');
        setShowForm(false);
      })
      .catch(error => {
        console.error('There was an error creating the memo!', error);
      });
  };
  return (<>
    <div style={{display: 'flex', justifyContent: 'flex-start'}}>
      <button onClick={toggleForm} style={{fontSize: '24px', padding: '10px', cursor: 'pointer'}}>
        {showForm ? '−' : '＋'}
      </button>
    </div>
    {showForm && (
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Memo</button>
      </form>
    )
    }
  </>)

}