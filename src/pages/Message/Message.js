import React, { useState, useEffect, useRef } from 'react';
import './Message.scss'

const Message = (props) => {

	const email = props.location.state.email;
	const successful = props.location.state.successful;

	return (
		<div>
			
			{successful===true? (
				<div className="alert alert-success msg-success text-center ">
					<h4 className="d-inline">A verification link has been sent your email:</h4> {email}
					<p >please check your spam folder if you can't find it</p>

				</div>
			) : (
					<div className="alert alert-danger">there is a problem, please signup again</div>
				)}
		</div>
	)
}

export default Message;