import React from "react";
import "./message.css";

const Message = ({ msg, currentUser }) => {
	const classDependUser =
		msg.user === currentUser ? "alert alert-primary" : "alert alert-dark";
	return (
		<div className="message-container">
			<span className={classDependUser}>
				{msg.user}: {msg.text}
			</span>
		</div>
	);
};

export default Message;
