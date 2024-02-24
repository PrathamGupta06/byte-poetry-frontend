import React from 'react';

function PoemCard({ id, poem, author, user }) {
  return (
    <div className="poem-card">
      <p>{poem}</p>
      <p>by {author} {user}</p>
    </div>
  );
}

export default PoemCard;
