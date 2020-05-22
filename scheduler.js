var scheduler = (function() {
	var public = {};

	var SCHEDULER;
	var CONFIG;

	public.render = function(config, events) {
		
		CONFIG = config;
		SCHEDULER = document.getElementById("scheduler");

		if (!SCHEDULER) {
			console.error("div#scheduler not defined.");
			return;
		}

		SCHEDULER.style.display = "grid";
		SCHEDULER.style.gridTemplateColumns = "50px repeat("+Object.keys(events).length+", 1fr)";
		SCHEDULER.style.gridTemplateRows = "repeat("+timeblocks[CONFIG.interval].length+", 40px)";
		SCHEDULER.style.minWidth = "640px";

		renderResourceBarOntoSchedule(Object.keys(events));

		renderTimeBlocksOntoSchedule(timeblocks[CONFIG.interval], events);

		Object.keys(events).forEach(function(resource_id) {
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

	var renderResourceBarOntoSchedule = function(resource_ids) {

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

	function renderTimeBlocksOntoSchedule(timeblocks, events) {

		var gridTemplateAreas = [];

		timeblocks.forEach(function(time) {
			
			gridTemplateAreaRow = '" tb_'+time;
			Object.keys(events).forEach(function(resource_id, index) {

				var timeElement = document.createElement("a");
				timeElement.href = "#" + time;
				timeElement.classList.add('time');
				timeElement.style.gridArea = "tb_" + time;
				timeElement.innerHTML = time;
				SCHEDULER.append(timeElement);

				var timeblockElement = document.createElement("a");
				timeblockElement.classList.add("timeblock");
				timeblockElement.href = "#" + time + "-" + resource_id;
				timeblockElement.style.gridArea = "ga_" + time + "-" + resource_id;

				SCHEDULER.append(timeblockElement);
				gridTemplateAreaRow += ' ga_' + time + '-' + resource_id;
			});

			gridTemplateAreaRow += '"';

			gridTemplateAreas.push(gridTemplateAreaRow);

		});

		gridTemplateAreas.forEach(function(templateArea) {
			SCHEDULER.style.gridTemplateAreas += templateArea;
		});

	}

	function renderEventsOntoSchedule(resource_id, events) {
		Object.keys(events).forEach( function(event_id) {
			renderEventOntoSchedule(resource_id, {
				"id": event_id,
				"type": events[event_id].type,
				"data": events[event_id].data,
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