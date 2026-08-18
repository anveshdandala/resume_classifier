import React from "react";
import { useState } from "react";
const FeedbackSystem = () => {
  const [rucount, setRucount] = useState(0);
  const [pucount, setPucount] = useState(0);
  const [sucount, setSucount] = useState(0);
  const [ducount, setDucount] = useState(0);
  const [tucount, setTucount] = useState(0);

  const [rdcount, setRdcount] = useState(0);
  const [pdcount, setPdcount] = useState(0);
  const [sdcount, setSdcount] = useState(0);
  const [ddcount, setDdcount] = useState(0);
  const [tdcount, setTdcount] = useState(0);

  const readability = () => {
    setRucount(rucount + 1);
  }
  const performance = () => {
    setPucount(pucount + 1);
  }
  const security = () => {
    setSucount(sucount + 1);
  }
  const documentation = () => {
    setDucount(ducount + 1);
  }
  const testing = () => {
    setTucount(tucount + 1);
  }

  const rdown = () => {
    setRdcount(rdcount + 1);
  }
  const pdown = () => {
    setPdcount(pdcount + 1);
  }
  const sdown = () => {
    setSdcount(sdcount + 1);
  }
  const ddown = () => {
    setDdcount(ddcount + 1);
  }
  const tdown = () => {
    setTdcount(tdcount + 1);
  }

  
  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
      <div className="flex wrap justify-content-center mt-30 gap-30">

        <div className="pa-10 w-300 card">
          <h2>Readability</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button 
            onClick = {readability}
            className="py-10 px-15" data-testid="upvote-btn-0">
              👍 Upvote
            </button>
            <button 
            onClick={rdown}
            className="py-10 px-15 danger" data-testid="downvote-btn-0">
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-0">
            Upvotes: <strong>{rucount}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-0">
            Downvotes: <strong>{rdcount}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Performance</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button 
            onClick={performance}
            className="py-10 px-15" data-testid="upvote-btn-1">
              👍 Upvote
            </button>
            <button 
            onClick={pdown}
            className="py-10 px-15 danger" data-testid="downvote-btn-1">
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-1">
            Upvotes: <strong>{pucount}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-1">
            Downvotes: <strong>{pdcount}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Security</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button 
            onClick={security}
            className="py-10 px-15" data-testid="upvote-btn-2">
              👍 Upvote
            </button>
            <button 
            onClick={sdown}
            className="py-10 px-15 danger" data-testid="downvote-btn-2">
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-2">
            Upvotes: <strong>{sucount}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-2">
            Downvotes: <strong>{sdcount}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Documentation</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button 
            onClick={documentation}
            className="py-10 px-15" data-testid="upvote-btn-3">
              👍 Upvote
            </button>
            <button 
            onClick={ddown}
            className="py-10 px-15 danger" data-testid="downvote-btn-3">
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-3">
            Upvotes: <strong>{ducount}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-3">
            Downvotes: <strong>{ddcount}</strong>
          </p>
        </div>
        <div className="pa-10 w-300 card">
          <h2>Testing</h2>
          <div className="flex my-30 mx-0 justify-content-around">
            <button 
            onClick={testing}
            className="py-10 px-15" data-testid="upvote-btn-4">
              👍 Upvote
            </button>
            <button 
            onClick={tdown}
            className="py-10 px-15 danger" data-testid="downvote-btn-4">
              👎 Downvote
            </button>
          </div>
          <p className="my-10 mx-0" data-testid="upvote-count-4">
            Upvotes: <strong>{tucount}</strong>
          </p>
          <p className="my-10 mx-0" data-testid="downvote-count-4">
            Downvotes: <strong>{tdcount}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSystem;
