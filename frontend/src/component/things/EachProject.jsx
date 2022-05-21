import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import configData from '../../config/url.json';

const Thing = (props) => {
	// state variables
	const token = localStorage.getItem('token');

	const { id, title, content, removeProject } = props;
	const [editProjectTitle, setEditProjectTitle] = useState(false);
	const [displayTitle, setDisplayTitle] = useState(title);
	const [newTitle, setNewTitle] = useState(title);

	const [currentContent, setCurrentContent] = useState(content);
	const [inputingNewItem, setInputingNewItem] = useState(false);
	const [changingItem, setChangingItem] = useState("");
	const [itemBeingChanged, setItemBeingChanged] = useState("");
	const [newItemValue, setNewItemvalue] = useState('');

	// Logic on the items in each project
	async function deleteItemFromDatabase(target) {
		console.log(target);
		try{
			const res = await axios.delete(configData.projectItemRoute,
				{
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token 
					},
					data: {
						list_id: id,
						item_name: target 
					}
				});
		} catch (err) {
			console.log(err);
		}
	}

	function handelClick (event) {
		setCurrentContent(prev => {
			return(prev.filter(e => e !== event.target.name));
		});
		// send the change to the database
		deleteItemFromDatabase(event.target.name);
	}

	function handelChangeNewItem (event) {
		setNewItemvalue(event.target.value);
	};

	async function addNewItemToDatabase (newItem) {
		try {
			const data = JSON.stringify({
				"list_id": id,
				"item_name": newItemValue
			});
			const config = {
				method: 'post',
				url: configData.projectItemRoute,
				headers: { 
					'Content-Type': 'application/json', 
					'x-auth-token': token
				},
				data : data
			};
        	await axios(config);
		} catch (err) {
			console.log(err.message);
		}
	}

	function handelAddNewItem () {
	    setCurrentContent(prev => {
        	return([...prev, newItemValue]);
	    });

        addNewItemToDatabase(newItemValue);

	    setNewItemvalue("");
	    setInputingNewItem(false);
	}
	
	const handelRemoveList = () => {
		removeProject( id );
	};
	
	// Logic on the project
	const deleteProjectFromDatabase = async ( project ) => {
		try {
			await axios.delete(configData.projectListRoute,
				{
					headers: {
						'x-auth-token': token,
						'Content-Type': 'application/json'
					},
					data: {
						list_id: project
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	const removeProjectFromDashboard = () => {
		removeProject( id );
		deleteProjectFromDatabase( id );
	};

	const handelClickTitle = (event) => { if (event.detail === 2) setEditProjectTitle(true) };
	const handelChangeTitle = (event) => { setNewTitle(event.target.value) };
	const handelNewTitle = async () => {
		setDisplayTitle(newTitle);
		try {
			const data = JSON.stringify({
				"list_id": id,
				"title": newTitle
			});
			const config = {
				method: 'put',
				url: configData.projectListRoute,
				headers: { 
					'Content-Type': 'application/json', 
					'x-auth-token': token
				},
				data : data
			};
        	await axios(config);
			setEditProjectTitle(false);

		} catch (err) {
			console.log(err);
		}
	};

	const handelClickItem = (event) => {
		if (event.detail === 2) {
			const idToBeChanged = event.target.getAttribute('value');
			const perviousContent = content.filter(each => each._id === idToBeChanged);
			setChangingItem(perviousContent[0].content);
			setItemBeingChanged(idToBeChanged);
		}
	};

	const handelNewItem = () => {

	}

	const handelChangeItem = (event) => { setChangingItem(event.target.value) }

    return(
        <div className="border-2 border-gray-300 drop-shadow-lg rounded-md p-1 mt-12">
			{editProjectTitle ? 
			<div className='flex flex-row'>
				<div className='my-1 basis-11/12 flex flex-row'>
										<input 
											value = {newTitle}
											onChange = {handelChangeTitle}
											className = "text-xl font-cormorant text-gray-400 basis-10/12"
										/>
										<span 
											className='basis-1/12 text-center cursor-pointer'
											onClick={handelNewTitle}
										>
											✓
										</span>
										<span 
											className='basis-1/12 text-center cursor-pointer'
											onClick={() => setEditProjectTitle(false)}>
											𐄂
										</span>
				</div> 
			</div> 
			:
			<div className='flex flex-row'>
				<h1 
					key={uuidv4()} 
					className="text-xl my-1 basis-11/12 font-cormorant cursor-pointer"
					onClick={handelClickTitle}
				>
					{displayTitle}
				</h1>
				<button key={uuidv4()} className="text-xl basis-1/12 my-auto font-cormorant" onClick={() => setInputingNewItem(true)}> + </button>
                <input type="checkbox" className="basis-1/12 my-auto font-cormorant" onClick={() => removeProjectFromDashboard()}/>
			</div>
			}
            <hr />
            <ul>
                {currentContent.map(each => {
                    return(
						(each._id === itemBeingChanged ? 
						<li key={uuidv4()} className="my-1 flex flex-row font-cormorant">
							<input 
								className='basis-10/12 text-gray-400'
								autoFocus
								value={changingItem}
								onChange={handelChangeItem}
							/>
							<span 
											className='basis-1/12 text-center cursor-pointer'
											onClick={handelNewItem}
										>
											✓
										</span>
										<span 
											className='basis-1/12 text-center cursor-pointer'
											onClick={() => setItemBeingChanged("")}>
											𐄂
										</span>
						</li> 
						:
						<li key={uuidv4()} className="my-1 flex flex-row font-cormorant">
                            <input type="checkbox"
                                   name={each.content}
                                   onClick={handelClick}
                                   className="basis-1/12 my-auto"
                                   />
                            <h1 
								className="ml-1 basis-11/12"
								value={each._id}
								onClick={handelClickItem}
							>
									{each.content}
							</h1>
                        </li>
						)
                        
                    )
                })}
            </ul>
            {inputingNewItem && <div className="flex flex-row">
                                    <input type="text" placeholder="new Item" className="basis-4/5 font-cormorant focus:outline-none focus:border-gray-400" onChange={handelChangeNewItem} value={newItemValue}/>
                                    <button className="basis-1/5 font-raleway" onClick={handelAddNewItem}>Add</button>
                                </div>
            }
        </div>
    );
}

export default Thing;
