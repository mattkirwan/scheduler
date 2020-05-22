# Scheduler

Playing around with the idea of a JS library for generating a modern css grid day schedule.

Current thinking is:

- Simple oneline JS include
- Config to define:
 - min/max start and end times
 - time block intervals
- Events
 - Keyed by resource id
  - Unique Resource == Column
  - Each resource contains events
   - Keyed by unique event id, type and data
- Every timeblock will render as a clickable link
 - Some kind of event emit when clicked for hooking into by a client?
- Maybe the possibility of themes and easy custom styling been applied

![Screenshot](https://raw.githubusercontent.com/mattkirwan/day-schedule/master/screenshot.png)
