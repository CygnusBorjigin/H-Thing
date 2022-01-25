// import frameworks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import configData from '../../config/url.json';

// import componemts
import NewProject from '../things/newList';
import RowOfProject from '../things/RowOfProject';


const ProjectDashBoard = () => {
	const userToken = localStorage.getItem('token');
	const [content, setContent] = useState([]);
	const [rows, setRows] = useState([]);
	const getData = async () => {
		try {
			const params = {
				headers: {
					'x-auth-token': userToken
				}
			};
			const response = await axios.get(configData.getAllList, params);
			const result = response.data.map(e => {
				return({
					id: e._id,
					title: e.title,
					content: e.items
				})
			});
			setContent(result);
	    // load content into rows
			let accum = [];
			for (var i = 0; i < result.length; i += 5){
				const chunk = result.slice(i, i + 5);
				accum.push(chunk);
			}
			setRows(accum);
	        } catch (err) {
        	    return err;
	        }
	    };
	
	useEffect(async ()=> {
		await getData();
	}, []);

	const addProjectToDatabase = async (listTitle) => {
		try {
			var data = JSON.stringify({
				"title": listTitle,
                                "items": []
			});

			var config = {
				method: 'post',
				url: configData.addList,
				headers: { 
                                    'x-auth-token': userToken, 
                                    'Content-Type': 'application/json'
                                },
				data : data
			};
			await axios(config);            
		} catch (err) {
			console.log(err);
		}
	};

	const addProject = async (listAdded) => {
		await addProjectToDatabase(listAdded);
		getData();
	};

	const removeProject_DashBoardLevel = ( removedProjectId ) => {
		// update the content
		const newContent = content.filter(each => each.id != removedProjectId);
		setContent( newContent );
		// updates the rows
		let accum = [];
		for (var i = 0; i < newContent.length; i += 5){
			const chunk = newContent.slice(i, i + 5);
			accum.push(chunk);
		}
		setRows(accum);
	};

    return (
        <div>
            <h1 className="mt-16 text-center text-gray-500 font-cizel">(Beta V 0.2.1  update daily)</h1>
            <NewProject 
	    	classname="mx-auto" 
	    	addcontent={addProject}
	    	rerender={addProject}
	    />
	    <div className="px-10">
		{rows.map(e => {
		    return(
		    	<RowOfProject 
				key={uuidv4()}
			    	content={e}
			    	removeProject_rowLevel={ removeProject_DashBoardLevel }
			/>
		    )
		})}
	    </div>
        </div>
    )
    
}

export default ProjectDashBoard;