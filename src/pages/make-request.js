import React, { useState } from "react";

const MakeRequest = ({ jwt }) => {
  const [result, setResult] = useState({});

  const submitRegular = (e) => {
    e.preventDefault();

    fetch("/.netlify/functions/request", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then(setResult);
  };

  return (
    <div>
      <h2>Make a Request</h2>
      <p>This will send a request to the API</p>
      <form>
        <div className="make-request">
          <div className="jwt">
            <label>JWT</label>
            <textarea value={jwt} readOnly></textarea>
          </div>
          <div className="buttons">
            <button type="submit" onClick={submitRegular}>
              Make Regular Request
            </button>
          </div>

          <div className="result">
            <pre>{JSON.stringify(result, null, 4)}</pre>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MakeRequest;
