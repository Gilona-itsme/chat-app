import React from "react";

const Send = ({ onChange, onSend, value }) => {
	return (
		<form className="input-group mb-3" onSubmit={onSend}>
			<input className="form-control" value={value} onChange={onChange} />
			<button className="btn btn-primary" type="submit">
				Send
			</button>
		</form>
	);
};

export default Send;
