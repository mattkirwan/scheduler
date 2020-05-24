var scheduler = (function() {
	var public = {};

	var SCHEDULER;
	var CONFIG;
	var EVENTS;
	var RESOURCE_IDS;

	public.render = function(config, events) {
		
		CONFIG = config;
		SCHEDULER = document.getElementById("scheduler");
		EVENTS = events;
		RESOURCE_IDS = Object.keys(events);

		if (!SCHEDULER) {
			console.error("div#scheduler not defined.");
			return;
		}

		SCHEDULER.style.display = "grid";
		SCHEDULER.style.gridTemplateColumns = "50px repeat("+RESOURCE_IDS.length+", 1fr)";
		SCHEDULER.style.gridTemplateRows = "repeat("+timeblocks[CONFIG.interval].length+", 40px)";
		SCHEDULER.style.minWidth = "640px";


		// Mock/possible response:
		var available_hours = {};
		RESOURCE_IDS.forEach(function(resource_id) {

			if (EVENTS[resource_id].hasOwnProperty("availabilities")) {

				// Possibly make a request to a service to return all timeblocks within start/end?
				// Or calculate locally?
				if (!available_hours.hasOwnProperty(resource_id)) {
					available_hours[resource_id] = [];
				}

				available_hours[resource_id] = mock_available_hours[resource_id];
			}

		});


		renderResourceBarOntoSchedule();

		renderTimeBlocksOntoSchedule(timeblocks[CONFIG.interval], available_hours);

		RESOURCE_IDS.forEach(function(resource_id) {
			renderEventsOntoSchedule(resource_id, events[resource_id].events);
		});
		
		document.body.append(SCHEDULER);
	}

	public.removeAllEvents = function() {
		document.querySelectorAll('.event').forEach(function(event) {
			event.remove();
		});
	}

	public.removeEvent = function(id) {
		var event = document.querySelector('#event-' + id);
		if (event != null) {
			event.remove();
		}
	}

	public.addEvent = function(resource_id, event) {
		renderEventOntoSchedule(resource_id, event);
	}

	var renderResourceBarOntoSchedule = function() {

		var resource_ids = RESOURCE_IDS;

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
		});

		resource_bar.style.gridTemplateAreas = resource_bar_template_areas + "\"";

		document.body.append(resource_bar);
	}

	function renderTimeBlocksOntoSchedule(timeblocks, available_hours) {

		var gridTemplateAreas = [];

		timeblocks.forEach(function(time) {
			
			// The actual time block (first column of each row)
			var scheduler_time = document.createElement("span");
			scheduler_time.id = "time_" + time;
			scheduler_time.classList.add('time');
			scheduler_time.style.gridArea = "tb_" + time;
			scheduler_time.innerHTML = time;
			SCHEDULER.append(scheduler_time);

			gridTemplateAreaRow = '" tb_'+time;
			RESOURCE_IDS.forEach(function(resource_id, index) {

				var timeblock_element;

				if (available_hours.hasOwnProperty(resource_id) && available_hours[resource_id].includes(time)) {
					timeblock_element = document.createElement('a');
					timeblock_element.href = '#' + time + '-' + resource_id;
				} else {
					timeblock_element = document.createElement('span');
					timeblock_element.classList.add('unavailable');
				}

				timeblock_element.classList.add('timeblock');
				timeblock_element.style.gridArea = 'ga_' + time + '-' + resource_id;

				SCHEDULER.append(timeblock_element);
				gridTemplateAreaRow += ' ga_' + time + '-' + resource_id;
			});

			gridTemplateAreaRow += '"';

			gridTemplateAreas.push(gridTemplateAreaRow);

		});

		gridTemplateAreas.forEach(function(templateArea) {
			SCHEDULER.style.gridTemplateAreas += templateArea;
		});

	}

	function renderEventsOntoSchedule(resource_id, resource_events) {
		Object.keys(resource_events).forEach( function(event_id) {
			renderEventOntoSchedule(resource_id, {
				"id": event_id,
				"type": resource_events[event_id].type,
				"data": resource_events[event_id].data,
			});
		});
	}

	function renderEventOntoSchedule(resource_id, event) {

		var eventBlock = document.createElement("a");
		eventBlock.href = "#event-" + event.id;
		eventBlock.id = "event-" + event.id;
		eventBlock.classList.add("event");
		eventBlock.classList.add("event-type-" + event.type);

		var eventTitle = document.createElement("span");
		eventTitle.classList.add("title");
		eventTitle.innerHTML = event.data.title;
		eventBlock.append(eventTitle);

		var start = event.data.start.replace(':', '');
		var end = moment(event.data.end, "HH:mm").subtract(5, "minutes").format("HHmm");

		eventBlock.style.gridArea = "ga_"+start+"-"+resource_id+" / ga_"+start+"-"+resource_id+" / ga_"+end+"-"+resource_id;

		SCHEDULER.append(eventBlock);
	}

	const hours = Array(24).fill(0).map((x, y) => {
		var h = x + y;
		if (y < 10) {
			h = '0'+h;
		}
		return h.toString();
	});


	return public;
})();



// This might be generated by a service call or locally?
// Either way - current mock data for resource "ae45f"
var mock_available_hours = {};
mock_available_hours['jna5sy'] = [
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
];

mock_available_hours['ae45f'] = [
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
];


// This should be generated from init CONFIG
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