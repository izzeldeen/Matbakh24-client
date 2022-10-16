import React from 'react';

export default function Loading(){
    return <div className="loader">
    <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
}

