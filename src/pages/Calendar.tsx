
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'meeting' | 'reminder' | 'deadline';
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(new Date().setHours(10, 0, 0, 0)),
      type: 'meeting',
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      type: 'deadline',
    },
    {
      id: 3,
      title: "Security Update",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      type: 'reminder',
    },
  ]);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const todaysEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'reminder':
        return 'bg-amber-100 text-amber-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Manage your meetings and events
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>
              {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={previousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              month={currentMonth}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>
              {date ? format(date, 'd MMMM yyyy') : 'No date selected'}
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" /> Add Event
            </Button>
          </CardHeader>
          <CardContent>
            {todaysEvents.length > 0 ? (
              <div className="space-y-4">
                {todaysEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(event.date, 'h:mm a')}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No events scheduled for this day
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
