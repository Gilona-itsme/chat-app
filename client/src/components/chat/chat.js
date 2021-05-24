import React, { Component } from "react";
import { socket } from "./socket";
import Message from "../message";
import Send from "../send";
import "./chat.css";

class Chat extends Component {
	socket = socket;
	state = {
		currentUser: "",
		isLogin: false,
		users: {},
		message: "",
		messages: [],
	};

	componentDidMount() {
		this.socket.on("message", (msg) => {
			if (this.state.isLogin) {
				this.setState(({ messages }) => {
					const newMessages = [...messages];
					if (newMessages.length > 10) {
						newMessages.shift();
					}
					return {
						messages: [...newMessages, { user: msg.user, text: msg.message }],
					};
				});
			}
		});
		this.socket.on("users", (users) => {
			this.setState({ users });
		});
	}

	changeMessage = (event) => {
		this.setState({ message: event.target.value });
	};

	changeName = (event) => {
		this.setState({ currentUser: event.target.value });
	};

	inputName = () => {
		const user = this.state.currentUser;
		if (user !== "") {
			this.setState({ isLogin: true });
			this.socket.emit("change:name", user);
		}
	};

	sendMessage = (event) => {
		event.preventDefault();
		const { currentUser, message } = this.state;
		if (message.trim().length) {
			this.socket.emit("message", {
				user: currentUser,
				message: message.trim(),
			});
			this.setState({ message: "" });
		}
	};
	render() {
		const { isLogin, currentUser, message, messages, users } = this.state;
		if (!isLogin) {
			return (
				<main className="form-signin">
					<h4 className="form-floating mb-3">Please, introduce yourself</h4>
					<div className="form-floating mb-3">
						<input
							className="form-control"
							placeholder="Введите ваш никнейм"
							id="floatingInput"
							value={currentUser}
							onChange={this.changeName}
						/>
						<label htmlFor="floatingInput">Nickname</label>
					</div>
					<button
						className="w-100 btn btn-lg btn-primary"
						onClick={this.inputName}
					>
						Login
					</button>
				</main>
			);
		}

		return (
			<div className="container">
				<div className="row align -items-start">
					<div className="message-list col-md-9">
						<Send
							value={message}
							onChange={this.changeMessage}
							onSend={this.sendMessage}
						/>
						<div className="messages">
							{messages.map((msg, key) => (
								<Message msg={msg} currentUser={currentUser} key={key} />
							))}
						</div>
					</div>
					<ul className="list-group col-md-3">
						{Object.values(users).map((user, key) => (
							<li className="list-group-item" key={key}>
								{user}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default Chat;
