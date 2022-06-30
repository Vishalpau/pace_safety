import React, { useState } from 'react';

export default function Bookmark() {
  const [bookmark, setBookmark] = useState('Bookmark');
  function handleBookmark() {
    // bookmarking the card
    setBookmark('Bookmarked');
    console.log('Bookmark');
  }
  return (
    <>
      <div style={{ hover: 'pointer' }}>
        <button type="button" onClick={handleBookmark}>
          {bookmark}
        </button>
      </div>
    </>
  );
}
