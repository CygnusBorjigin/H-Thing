import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import configData from '../../config/url.json';

const EachItem = (props) => {
    const token = localStorage.getItem('token');

    var { database_id, item_id, item_content, projectID, removeItemFromList, beingDragged, beingDropped } = props;
    const [displayItem, setDisplayItem] = useState(true);
    const [currentContent, setCurrentContent] = useState(item_content);
    const [newContent, setNewContent] = useState(item_content);

    const handelFinishItem = async (event) => {
        // remove item userside
        removeItemFromList(event.target.getAttribute('name'));
        //remove item database
        try{
			await axios.delete(configData.projectItemRoute,
				{
					headers: {
						'Content-Type': 'application/json',
						'x-auth-token': token 
					},
					data: {
						list_id: projectID,
						item_name: item_content
					}
				});
		} catch (err) {
			console.log(err);
		}
    };

    const handelClickItem = (event) => { if (event.detail === 2) setDisplayItem(false) };
    const handelChangeContent = (event) => {
        setNewContent(event.target.value); 
    };
    const handelNewContent = async () => {
        // change content locally
        setCurrentContent(newContent);
        setDisplayItem(true);

        // send the change to the database
		try {
			const data = JSON.stringify({
				"list_id": projectID,
				"item_id": database_id,
				"new_content": newContent
			});
			const config = {
				method: 'put',
				url: configData.projectItemRoute,
				headers: { 
					'Content-Type': 'application/json', 
					'x-auth-token': token
				},
				data : data
			};
        	const res = await axios(config);
		} catch (err) {
			console.log(err);
		}
    };

	// logic for drag and drop item
	const handelDrag = () => {
		beingDragged(database_id);
	};

	const handelDrop = () => {
		beingDropped(database_id)
	};
    
    return(
        displayItem 
        ?
        <li key={uuidv4()} 
            className="my-1 flex flex-row font-cormorant"
			draggable="true"
			onDrag={handelDrag}
			onDrop={handelDrop}
			>
            <input 
                type="checkbox"
                name={item_id}
                onClick={handelFinishItem}
                className="basis-1/12 my-auto"
            />
            <h1 
				className="ml-1 basis-11/12 cursor-pointer"
				value={item_id}
				onClick={handelClickItem}
			>
				{currentContent}
			</h1>
        </li>
        :
        <div className='flex flex-row'>
				<input 
					value = {newContent}
					onChange = {handelChangeContent}
					className = "text-l font-cormorant text-gray-400 basis-10/12 border-gray-200 focus:outline-none border-2 focus:border-gray-400"
					autoFocus
				/>
				<span 
					className='basis-1/12 text-center cursor-pointer my-auto'
					onClick={handelNewContent}
				>
					✓
				</span>
				<span 
					className='basis-1/12 text-center cursor-pointer my-auto'
					onClick={() => setDisplayItem(true)}
				>
					𐄂
				</span>
		</div> 
    )
}

export default EachItem;