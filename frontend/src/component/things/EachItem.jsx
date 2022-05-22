import { useState } from 'react';
import axios from 'axios';
import configData from '../../config/url.json';

const EachItem = (props) => {
    var { database_id, item_id, item_content } = props;
    const [displayItem, setDisplayItem] = useState(true);
    const [changingContent, setChangingContent] = useState(item_content);
    
    return(
        <li key={uuidv4()} className="my-1 flex flex-row font-cormorant">
            <input 
                type="checkbox"
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
}