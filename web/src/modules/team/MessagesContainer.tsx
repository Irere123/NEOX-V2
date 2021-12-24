import React from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MessagesContainer: React.FC = () => {
  return (
    <>
      {arr.map(() => (
        <div className="MessageContainer__message">
          <div className="MessageContainer__messageAvatar">
            <h4>JD</h4>
          </div>
          <div className="MessageContainer__messageContent">
            <div>
              <p>John Doe</p>
              <p>10/02/2021</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum,
              quasi.
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessagesContainer;
