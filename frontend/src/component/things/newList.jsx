import React, { useState } from 'react';

const NewThing = (props) => {
	const [newListValue, setNewListValue] = useState('');
	const handleChange = (event) => {
		setNewListValue(event.target.value);
	};
	const addList = () => {
		props.addcontent(newListValue);
		setNewListValue('');
		props.rerender();
	}
	return (
        	<div className="flex flex-col justify-center mt-20 w-1/4 mx-auto border-2 border-gray-400 rounded-lg drop-shadow-md">
	            <input 
					type="text" 
					placeholder="new project" 
					className="w-5/6 mx-auto my-4 rounded-md h-8 text-center border-gray-300 border-2 font-cormorant focus:outline-none focus:border-gray-400" 
					value={newListValue}
					onChange={handleChange}
                />
            	<button className="w-1/5 h-8 my-2 mx-auto font-cormorant hover:bg-slate-200 border-2 border-gray-200" onClick={addList}>Add</button>
        </div>
    )
}

export default NewThing;
