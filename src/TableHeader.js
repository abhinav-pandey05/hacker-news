import React from 'react';
 
function TableHeader() { 
  return (
    <tr className="header">
      <th className="comment col-header">Comments</th>
      <th className="points col-header">Vote Count</th>
      <th className="upvote col-header">Upvote</th>
      <th className="detail col-header">Details</th>
    </tr>
  );
}
 
export default TableHeader;