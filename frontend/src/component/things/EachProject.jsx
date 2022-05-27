import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import configData from '../../config/url.json';
import EachItem from './EachItem';

const Thing = (props) => {
	// state variables
	const token = localStorage.getItem('token');

	// states for displaying
	var { id, title, content, removeProject, beingDragged, beingDropped } = props;
	const [editProjectTitle, setEditProjectTitle] = useState(false);
	const [displayTitle, setDisplayTitle] = useState(title);
	const [newTitle, setNewTitle] = useState(title);

	// states for entering new item
	const [currentContent, setCurrentContent] = useState(content);
	const [inputingNewItem, setInputingNewItem] = useState(false);
	const [newItemValue, setNewItemvalue] = useState('');

	// state for drag and drop item
	const [itemBeingDragged, setItemBeingDragged] = useState("");
	const [itemBeingDropped, setItemBeingDropped] = useState("");
	
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
	
	// logic for adding new item
	const handelChangeNewItem = (event) => { setNewItemvalue(event.target.value) };
	const addNewItemToDatabase = async (newItem) => {
		const order = content.length;
		try {
			const data = JSON.stringify({
				"list_id": id,
				"item_order": order,
				"item_frontend_id": uuidv4(),
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
	};
	const handelAddNewItem = () => {
	    setCurrentContent(prev => {
        	return([...prev, {content: newItemValue, order:content.length}]);
	    });

        addNewItemToDatabase(newItemValue);

	    setNewItemvalue("");
	    setInputingNewItem(false);
	};

	// logic for removing item
	const removeItemFrontend = (item_id) => {
		setCurrentContent(prev => {
			return(prev.filter(each_item => each_item.item_frontend_id !== item_id));
		})
	};

	// logic for drag and drop project
	const handelDrag = () => {
		beingDragged(id);
	};

	const handelDrop = () => {
		beingDropped(id);
	};

	const handelOver = (event) => {
		event.preventDefault();
	};

	// logic for drag and drop item
	const handelDragItem = (idBeingDragged) => {
		setItemBeingDragged(idBeingDragged);
	};

	const handelDropItem = (idBeingDropped) => {
		setItemBeingDropped(idBeingDropped);
	};

	const handelSwapItem = (item1, item2) => {
		console.log(item1, item2);
	};

	useEffect(() => {
		console.log(itemBeingDragged);
		console.log(itemBeingDropped);
	}, [itemBeingDropped])

    return(
        <div 
			className="border-2 border-gray-300 drop-shadow-lg rounded-md p-1 mt-12 w-[330px] m-3"
			draggable="true"
			onDragStart={handelDrag}
			onDrop={handelDrop}
			onDragOver={handelOver}
		>
			{editProjectTitle ? 
			<div className='flex flex-row'>
				<input 
					value = {newTitle}
					onChange = {handelChangeTitle}
					className = "text-xl font-cormorant text-gray-400 basis-10/12 border-gray-200 focus:outline-none border-2 focus:border-gray-400"
					autoFocus
				/>
				<span 
					className='basis-1/12 text-center cursor-pointer my-auto'
					onClick={handelNewTitle}
				>
					✓
				</span>
				<span 
					className='basis-1/12 text-center cursor-pointer my-auto'
					onClick={() => setEditProjectTitle(false)}
				>
					𐄂
				</span>
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
                {currentContent.map(each => <EachItem
														key={uuidv4()}
														database_id = {each._id}
														item_id = {each.item_frontend_id}
														item_content = {each.content}
														projectID = {id}
														removeItemFromList = {removeItemFrontend}
														beingDragged={handelDragItem}
														beingDropped={handelDropItem}
													/>
											)}
            </ul>
            {inputingNewItem && <div className="flex flex-row">
                                    <input 
										type="text" 
										placeholder="new Item" 
										className="basis-4/5 font-cormorant focus:outline-none focus:border-gray-400" 
										onChange={handelChangeNewItem} 
										value={newItemValue}
										autoFocus
									/>
                                    <button className="basis-1/5 font-raleway" onClick={handelAddNewItem}>Add</button>
                                </div>
            }
        </div>
    );
}

export default Thing;
