import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // Optional for default styling\
import dayjs from "dayjs";

function EventCalendar(props) {
  const { calendarData, initialDate } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      eventDidMount={(info) => {
        // Create a Tippy tooltip
        tippy(info.el, {
          content: `
            <strong>${info.event.title}</strong><br/>
            Start: ${dayjs(info.event.startStr).format("DD MMM, YYYY")}<br/>
            ${
              info.event.end
                ? `End: ${dayjs(info.event.endStr).format("DD MMM, YYYY")}`
                : ""
            }
          `,
          allowHTML: true,
          placement: "top",
        });
      }}
      initialView="dayGridMonth"
      initialDate={initialDate}
      contentHeight="600"
      events={calendarData}
      editable={true}
      height="100%"
      dayMaxEventRows={true}
      fixedWeekCount={false}
    />
  );
}

export default EventCalendar;
