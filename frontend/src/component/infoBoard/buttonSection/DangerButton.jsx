import React from 'react';

const DangerButton = (props) => {
	const text = props.text;
	const action = props.func;
	return(
		<div>
			<button className="w-32 border-2 border-red-300 h-content rounded-md hover:bg-red-300 text-red-600 font-cizel" onClick={action}>
				{ text }
			</button>
		</div>
	)
}

export default DangerButton;
