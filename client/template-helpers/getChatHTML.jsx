import React from 'react';

import Nav from "../components/Nav.jsx";
import router from "./router.jsx";

const isChatterUser = function(chatterUsers) {
  const chatterUserIds = chatterUsers.map(function(user) {
    return user.userId;
  });
  return (chatterUserIds.indexOf(Meteor.userId()) > -1) ;
};


const getChatHTML = function(data) {
  let chatHTML = <div>Hei Man not useing chatter</div>;
  if (isChatterUser(data.data.chatterUsers, Meteor.userId())) {
    chatHTML = (
      <div className="ui right vertical wide visible sidebar chatter" id="chatter">
          <Nav
            view={data.state.view}
            setView={data.setView}
            chatState={data.state.chatState}
            roomId={data.state.roomId}
            header={data.state.header}
          />
          <div className="wrapper">
            {router(data, data.state.view).component()}
          </div>
      </div>
    );
  };
  return chatHTML;
};

export default getChatHTML;