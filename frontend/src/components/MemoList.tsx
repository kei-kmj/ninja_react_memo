export const MemoList = ({memos, handleMemoClick}) => {
  return (

      <ul style={{listStyleType: 'none', padding: 0}}>
        {memos.map(memo => (
          <li key={memo.id}>
            <a href="#" onClick={() => handleMemoClick(memo)} style={{textDecoration: 'none', color: 'blue'}}>
              {memo.title}
            </a>
          </li>
        ))}
      </ul>
  )
}