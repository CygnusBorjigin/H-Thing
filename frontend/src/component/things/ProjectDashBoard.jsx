// import frameworks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import configData from '../../config/url.json';

// import componemts
import NewProject from './newList';
import EachProject from './EachProject';

const ProjectDashBoard = () => {
	const userToken = localStorage.getItem('token');
	const [content, setContent] = useState([]);


	// get screen size
	const [windowDimenion, detectHW] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	  })
	
	  const detectSize = () => {
		detectHW({
		  winWidth: window.innerWidth,
		  winHeight: window.innerHeight,
		})
	  }
	
	  useEffect(() => {
		window.addEventListener('resize', detectSize)
	
		return () => {
		  window.removeEventListener('resize', detectSize)
		}
	  }, [windowDimenion])

	const getData = async () => {
		try {
			const params = {
				headers: {
					'x-auth-token': userToken
				}
			};
			const response = await axios.get(configData.projectAllRoute, params);
			const result = response.data.map(e => {
				return({
					id: e._id,
					title: e.title,
					content: e.items
				})
			});
			setContent(result.sort((a, b) => a.order - b.order));
	        } catch (err) {
        	    return err;
	        }
	    };
	
	useEffect(async ()=> {
		await getData();
	}, []);

	const addProjectToDatabase = async (listTitle) => {
		const currentLength = content.length;
		try {
			var data = JSON.stringify({
				"title": listTitle,
                "items": [],
				"order": currentLength
			});

			var config = {
				method: 'post',
				url: configData.projectListRoute,
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
		const newContent = content.filter(each => each.id !== removedProjectId);
		setContent( newContent );
	};

    return (
        <div>
            <NewProject 
	    	classname="mx-auto" 
	    	addcontent={addProject}
	    	rerender={addProject}
	    />
	    <div className="flex flex-row flex-wrap">
		{content.map(e => {
		    return(
		    	<EachProject 
					key={uuidv4()}
					id={e.id}
					title={e.title}
					content={e.content}
					removeProject={removeProject_DashBoardLevel}
			/>
		    )
		})}
	    </div>
        </div>
    )
    
}

export default ProjectDashBoard;
