import React from 'react';

const InfoStr = (props) => {
	const info = props.text;
	return (
		<h1 className="text-xl text-center font-cormorant mb-4">
		{info}
		</h1>
	);
};

export default InfoStr;
