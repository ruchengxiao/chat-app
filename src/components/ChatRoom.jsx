import React, { Component } from 'react';

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            socket : this.props.socket,
            username: this.props.username,
            message : '',
            messages : this.props.messages,
            sendMessage : this.props.sendMessage,
            sendMessage2 : this.props.sendMessage2,
            currentRoom : this.props.currentRoom,
            nextRoom : '',
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          currentRoom: nextProps.currentRoom,
          messages : this.props.messages,
        });
        console.log(`username is now:${this.props.username}`)
    }
    
    handleChange(e) {
        this.setState({message: e.target.value})
        //console.log(`${this.state.username} input ${this.state.message}`)
    }

    handleChangeRoomName(e) {
        this.setState({nextRoom: e.target.value})
    }

    //for general message
    handleClick(e) {
        e.preventDefault();
        this.state.sendMessage(this.props.socket, this.state.username, this.state.message, this.state.currentRoom)
        console.log(`${this.state.username} sent :${this.state.username}`)
        this.setState({
            message: ``,
        })
    }
    //for join message
    handleClick2(e) {
        e.preventDefault();
        this.changeRoom(this.props.socket, this.state.username, this.state.currentRoom, this.state.nextRoom)
        this.setState({
            message: ``,
        })
    }
    //temp
    changeRoom(socket, currentUser, currentRoom, nextRoom){
        let data = {currentUser, currentRoom, nextRoom}
        socket.emit("change", data)
        console.log(`client room change sent`)
        this.setState({
            currentRoom: nextRoom,
            nextRoom: ``,
        })
        this.state.sendMessage2(socket, currentUser, `Join in! ${nextRoom}`, nextRoom)
        this.props.updateRoom(nextRoom)
        this.props.updateMsgs(nextRoom)
    }
    

    render() {
        
        
        const messageList = this.props.messages.map((message) => {
            const username = message.username
            const cUser = this.state.username
            console.log(`username:${username},cUser:${cUser}`)
            return(
                     username != cUser ? 
                    <li class="left clearfix">
                        <span class="chat-img1 pull-left">
                            <img src="https://cdn.wezift.com/assets/apps/supreme/logo/_imgSingle/201dd34d8ed809a3f380c66cfd8f7747.png?mtime=20171005200957" alt="User Avatar" class="img-circle"></img>
                        </span>
                        <div class="chat-body1 clearfix">
                            <p>{message.username}: {message.message}</p>
                        </div>
                    </li>
                    :
                    <li class="right clearfix">
                        <div class="chat-body1 clearfix">
                            <p>{message.username}: {message.message}</p>
                        </div>
                        <span class="chat-img1 pull-right">
                            <img src="https://cdn.wezift.com/assets/apps/supreme/logo/_imgSingle/201dd34d8ed809a3f380c66cfd8f7747.png?mtime=20171005200957" alt="User Avatar" class="img-circle"></img>
                        </span>
                    </li>
                )
        })
        return(
            
            
                <div class="row">
                    <div class="col-lg-3 chat_sidebar">
                        <div class="row chatRow">
                        </div>
                        <div class="member_list">
                        </div>
                    </div>
                    <div class="col-lg message_section">
                        <div class="row">
                            <div class="col-lg message_section">
                                {/* <div className="input-box">
                                    <div className="input">
                                        <input type="text" placeholder="input roomName" value={this.state.nextRoom} 
                                        onChange={this.handleChangeRoomName}
                                        />
                                    </div>
                                    <div className="button">
                                        <button type="button" onClick={this.handleClick2}>ChangeRoom</button>
                                    </div>
                                </div> */}
                                <div class="new_message_head">
                                    <div class="pull-left chatRoom">currentRoom: {this.props.currentRoom}
                                    </div>
                                </div>
                                <div class="chat_area">
                                    <ul class="list-unstyled">
                                        {messageList}
                                    </ul>
                                </div>
                            </div>
                            <div class="message_write">
                                <textarea class="form-control" 
                                    placeholder="type a message" 
                                    value={this.state.message} 
                                    onChange={this.handleChange}>
                                </textarea>
                                <div class="clearfix">
                                </div>
                                <div class="chat_bottom">
                                    <a href="#" class="pull-left upload_btn"><i class="fa fa-cloud-upload" aria-hidden="true"></i>Add Picture</a>
                                    <a href="#" class="pull-right btn btn-success" onClick={this.handleClick}>Send</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        )
    }
}

export default ChatRoom;