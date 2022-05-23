// importing frameworks

import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// import components

import EachProject from './EachProject';
import configData from '../../config/url.json';

const RowOfProject = (props) => {
	const { content, removeProject_rowLevel, projectPerRow } = props;
	const [rowContent, setRowContent] = useState(content);
	const userToken = localStorage.getItem('token');	

	const removeProject = (idToRemove) => {
		removeProject_rowLevel(idToRemove);
	};

	return(
		<div className="flex flex-row">
		{rowContent.map(e => {
				return(
					<EachProject 
						key={uuidv4()}
        	            id={e.id}
                	    title={e.title}
                        content={e.content}
						removeProject={ removeProject_rowLevel }
	                />
				)
			})}
		</div>
	)
}

export default RowOfProject;
