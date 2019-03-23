import rawData from './lifeData.json'


export function processData() {

	const born = Date.UTC(1988,09,27)
	const today = Date.now()

	const numberOfWeeks = Math.floor((today - born)/(1000.0*3600 * 24 * 7))
	const numberOfYears = (today-born)/(1000.0 * 3600 * 24 * 365.25)

	const weeksInCurrentYear = (numberOfYears - Math.floor(numberOfYears))*52.1429
	

	//not used but just for fun
	const birthSecondParty = new Date(born + Math.pow(10,12))

	data = []

	for (let i = 0; i < numberOfWeeks; i++){
		data.push({week: i, activity: [], tags: [], skills: []})
	}


	rawData.map((rd)=> {
		let weeks = determineWeeks(rd.start, rd.end)
		let startWeek = weeks[0]
		let endWeek = weeks[1]

		let modifyData = data.slice(startWeek, endWeek)

		data.map((d,i)=> {
			if (i >= startWeek && i <endWeek){
				if (rd.tags[0] == "travel"){
					d.activity = [{name: rd.activity, schedule: 1}]
					d.location = rd.location
					d.tags = rd.tags
					d.skills = rd.skills

				}
				else{
					d.activity.push({name: rd.activity, schedule: rd.schedule});
					d.location = rd.location;

					d.tags = d.tags.concat(rd.tags);
					d.skills = d.skills.concat(rd.skills)
				}
			}

		})

	})

	console.log(data)

	function determineWeeks(start, end) {

		//create start and end UTC dates
		let start_date = Date.UTC(start.split('-')[0], start.split('-')[1], start.split('-')[2])
		let end_date = Date.UTC(end.split('-')[0], end.split('-')[1], end.split('-')[2])


		let startWeek = Math.floor((start_date - born)/(1000.0*3600 * 24 * 7))
		let endWeek = Math.floor((end_date - born)/(1000.0*3600 * 24 * 7))

		return [startWeek, endWeek]


	}


	return data

}