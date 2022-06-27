import { object } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function handleBookmarkList() {
  // displaying the list of bookmarklist using filter and map

  console.log('BookmarkList');
}

export default function BookmarkList() {
  return (
    <>
      <div style={{ hover: 'pointer' }}>
        <button type="button" onClick={handleBookmarkList}>
          {/* My BookmarkList */}
        </button>
      </div>
    </>
  );
}
