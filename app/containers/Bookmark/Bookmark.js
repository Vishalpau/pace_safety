import React from 'react';

export default function Bookmark() {
  function handleBookmark() {
    // bookmarking the card

    console.log('Bookmark');
  }
  return (
    <>
      <div style={{ hover: 'pointer' }}>
        <button type="button" onClick={handleBookmark}>
          My Bookmark
        </button>
      </div>
    </>
  );
}
