import React from 'react';
import Loader from "../components/Loader.jsx"

const MainSettings = React.createClass({

  getInitialState: function() {
    return {
      roomUsers: [],
      archived: this.props.room.archived
    };
   },

  componentDidMount() {
    $(".ui.toggle.checkbox").checkbox();
    if (this.state.archived) {
      $(".ui.toggle.checkbox").checkbox('check');
    }
    Meteor.call("room.users", this.props.room._id, (error, result) => {
      this.setState({roomUsers: result});
    });
  },

  toggleArchivedState() {
    const params = {
      archived: !this.state.archived,
      roomId: this.props.room._id
    };
    Meteor.call("room.archive", params);
    this.setState({archived: !this.state.archived});
  },

  render() {
    const user = Meteor.user();

    const addUsersHTML = (
      <div className="item addUserItem" onClick={ () => this.props.setView("addUsers")}>
        <i className="add user icon"></i>
        <div className="content">
          <a className="header">
            Add or remove users...
          </a>
        </div>
      </div>
    );

    const roomUsers = this.state.roomUsers;
    const roomUsersHTML = roomUsers.map(function(user) {
      const statusClass = user.profile.online ? "user-status online" : "user-status offline";
      return (
        <div className="item room-user" key={user._id}>
          <div className={statusClass}></div>
          <img
            className="ui avatar image"
            src={user.profile.chatterAvatar}
          />
          <div className="content">
            <a className="header nickname">
              {user.profile.chatterNickname}
            </a>
            <div className="description last-active">
              Last logged in just now.
            </div>
          </div>
        </div>
      );
    });


    return (
      <div className="padded settings scrollable">
        <div className="ui header">
          Channel description
        </div>
        <p className="room-description">
          {this.props.room.description}
        </p>
        <p className="gray-text">
          This channel was created by {this.props.room.createdBy} on the {this.props.room.createdAt.toISOString()}.
        </p>
        <div className="ui toggle checkbox" onClick={this.toggleArchivedState} >
          <label>
            <span className="ui header">Archive Chat</span>
          </label>
          <input
            type="checkbox"
            value={this.props.archived}
            name="public"
            tabIndex="0"
            className="hidden"
          />
        </div>
        <p>
          Archived chats will store the conversation and stop notifications from bothering you in the future.
        </p>
        <div className="ui accordion room-users">
          <div className="title active">
            <i className="dropdown icon"></i>
            <span className="ui header">
              Channel members ({roomUsers.length})
            </span>
          </div>
          <div className="content active">
            <div className="ui list relaxed">
              {user.profile.isChatterAdmin ? addUsersHTML : null}
              <div className="ui divider"></div>
              {roomUsers.length > 0 ? roomUsersHTML : <Loader/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default MainSettings;
