import React, { useRef } from "react";

const ORS_KEY = process.env.REACT_APP_ORS_KEY;

const SearchBar = ({allData, setAllData, setRadius, setCategories, categories}) => {
	const from = useRef('initial value');
	const whereTo = useRef('initial value');
	const buffer = useRef('5');
	const categoryList = ['religion', 'natural', 'historic', 'cultural', 'architecture'];

	const search = async () => {
		setRadius(buffer.current.value);
		// Search for origin coordinates
		const dataFrom1 = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${from.current.value.replace(/ /g,'-')}`)
			.then(response => response.json())
			.catch((err) => {console.log("An error occurred: " + err);});
		//Search for destination coordinates
		const dataTo1 = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${ORS_KEY}&text=${whereTo.current.value.replace(/ /g,'-')}`)
			.then(response => response.json())
			.catch((err) => {console.log("An error occurred: " + err);});
		setAllData({...allData, dataFrom: dataFrom1, dataTo: dataTo1})
	}

	const toggleCategories = (e) => {
		if (categories.length > 0) {
			if ([...categories].includes(e.target.value)) {
				setCategories([...categories].slice(0,categories.indexOf(e.target.value)).concat([...categories].slice(categories.indexOf(e.target.value) + 1)));
				e.target.style.backgroundColor = "grey";
			} else {
				setCategories([...categories, e.target.value]);
				e.target.style.backgroundColor = "green";
			}
		} else {
			setCategories([e.target.value]);
			e.target.style.backgroundColor = "green";
		}
	}
	
	return (
		<>
		<input type="text" ref={from} placeholder="from"></input>
		<input type="text" ref={whereTo} placeholder="to"></input>
		<label htmlFor="buffer">Kilometers (between 1 and 30):</label>
		<input type="number" id="buffer" name="buffer" min="1" max="30" ref={buffer}/> 
		{categoryList.map(el => <button type="button" key={el} value={el} onClick={toggleCategories}>{el}</button>)}
		<button type="button" onClick={search}>Search</button>
		</>
	);
}

export default SearchBar;