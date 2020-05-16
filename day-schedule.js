function loadScheduler(config, data) {

	// config.schedule_id = "1234-uuid-5678"
	// load schedule
	//     timeblocks
	//     interval
	//	   style
	// var config = {
	// 	"interval": 10,
	// };
	console.log(config)
	console.log(data)

	var timeblocks = {
		5: [
			'0800',
			'0805',
			'0810',
			'0815',
			'0820',
			'0825',
			'0830',
			'0835',
			'0840',
			'0845',
			'0850',
			'0855',
			'0900',
			'0905',
			'0910',
			'0915',
			'0920',
			'0925',
			'0930',
			'0935',
			'0940',
			'0945',
			'0950',
			'0955',
			'1000',
			'1005',
			'1010',
			'1015',
			'1020',
			'1025',
			'1030',
			'1035',
			'1040',
			'1045',
			'1050',
			'1055',
			'1100',
			'1105',
			'1110',
			'1115',
			'1120',
			'1125',
			'1130',
			'1135',
			'1140',
			'1145',
			'1150',
			'1155',
			'1200',
		],
	};


	var schedule = document.createElement("div");

	schedule.id = "schedule";
	schedule.style.display = "grid";
	schedule.style.gridTemplateColumns = "50px repeat("+Object.keys(data).length+", 1fr)";
	schedule.style.gridTemplateRows = "repeat("+timeblocks[config.interval].length+", 40px)";
	schedule.style.minWidth = "640px";

	renderResourceBarOntoSchedule(Object.keys(data), schedule);

	renderTimeBlocksOntoSchedule(timeblocks[config.interval], schedule, data);

	Object.keys(data).forEach(function(resource_id) {
		renderEventsOntoSchedule(resource_id, data[resource_id].events, schedule, config);
	});
	

	document.body.append(schedule);
}

function renderResourceBarOntoSchedule(resource_ids, schedule) {

	var resource_bar = document.createElement("div");

	resource_bar.id = "resource_bar";
	resource_bar.style.display = "grid";
	resource_bar.style.gridTemplateColumns = " 50px repeat("+resource_ids.length+", 1fr) ";
	resource_bar.style.gridTemplateRows = "40px";
	var resource_bar_template_areas = "\" rb ";

	resource_ids.forEach(function (resource_id) {

		resource_bar_template_areas += "resource-" + resource_id + " ";

		var resource_container = document.createElement('div');
		resource_container.classList.add('resource');
		resource_container.innerHTML = resource_id;
		resource_container.style.gridArea = "resource-"+resource_id;

		resource_bar.append(resource_container)

		// resource_bar.innerHTML = resource_id;
	});

	console.log(resource_bar_template_areas)
	resource_bar.style.gridTemplateAreas = resource_bar_template_areas + "\"";

	document.body.append(resource_bar);
}

function renderEventsOntoSchedule(resource_id, events, schedule, config) {
	Object.keys(events).forEach( function(event_id) {
		var eventBlock = document.createElement("a");
		eventBlock.href = "#event-" + event_id;
		eventBlock.id = "#event-" + event_id;
		eventBlock.classList.add("event");
		eventBlock.classList.add("event-type-" + events[event_id].type);

		var eventTitle = document.createElement("span");
		eventTitle.classList.add("title");
		eventTitle.innerHTML = events[event_id].data.title;
		eventBlock.append(eventTitle);

		// console.log(events[event_id]);

		var start = moment(events[event_id].data.start, "HH;mm").format("HHmm");
		var end = moment(events[event_id].data.end, "HH;mm").subtract(config.interval, "minutes").format("HHmm");

		eventBlock.style.gridArea = "ga_"+start+"-"+resource_id+" / ga_"+start+"-"+resource_id+" / ga_"+end+"-"+resource_id;

		schedule.append(eventBlock);
	});
}


function renderTimeBlocksOntoSchedule(timeblocks, schedule, data) {

	var gridTemplateAreas = [];

	timeblocks.forEach(function(time) {
		
		gridTemplateAreaRow = '" tb_'+time;
		Object.keys(data).forEach(function(resource_id, index) {

			var timeElement = document.createElement("a");
			timeElement.href = "#" + time;
			timeElement.classList.add('time');
			timeElement.style.gridArea = "tb_" + time;
			timeElement.innerHTML = time;
			schedule.append(timeElement);

			var timeblockElement = document.createElement("a");
			timeblockElement.classList.add("timeblock");
			timeblockElement.href = "#" + time + "-" + resource_id;
			timeblockElement.style.gridArea = "ga_" + time + "-" + resource_id;

			schedule.append(timeblockElement);
			gridTemplateAreaRow += ' ga_' + time + '-' + resource_id;
		});

		gridTemplateAreaRow += '"';

		gridTemplateAreas.push(gridTemplateAreaRow);

	});

	gridTemplateAreas.forEach(function(templateArea) {
		schedule.style.gridTemplateAreas += templateArea;
	});

}