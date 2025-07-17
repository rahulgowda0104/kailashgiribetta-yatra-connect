import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Route, AlertTriangle, Users } from "lucide-react";

const EventDetails = () => {
  const guidelines = [
    "Wear saffron or white attire during the Yatra",
    "Maintain purity of mind and body throughout the journey", 
    "Walk barefoot when possible as a mark of devotion",
    "Carry your Kanwar with respect and devotion",
    "Chant 'Bol Bam' and 'Har Har Mahadev' while walking",
    "Follow designated routes and safety instructions",
    "Respect fellow pilgrims and volunteers",
    "Carry identification and emergency contact details"
  ];

  const schedule = [
    {
      day: "July 26, 2025",
      events: [
        { time: "4:00 AM", activity: "Registration & Kanwar Distribution", location: "Narayanhalli Cross" },
        { time: "5:30 AM", activity: "Sacred Water Collection Ceremony", location: "Local Sacred Source" },
        { time: "6:30 AM", activity: "Yatra Begins - Group Departure", location: "Narayanhalli Cross" },
        { time: "12:00 PM", activity: "Midday Rest & Prasadam", location: "Rest Point 1" },
        { time: "6:00 PM", activity: "Evening Camp Setup", location: "Halfway Point" }
      ]
    },
    {
      day: "July 27, 2025",
      events: [
        { time: "4:00 AM", activity: "Morning Prayers & Departure", location: "Camp" },
        { time: "10:00 AM", activity: "Sacred Darshan Break", location: "Local Temple" },
        { time: "2:00 PM", activity: "Final Ascent Begins", location: "Base of Kailasagiri" },
        { time: "6:00 PM", activity: "Reach Kailasagiri Guhanthaara Devalaya", location: "Dakshina Kailasa Kshethra" },
        { time: "7:00 PM", activity: "Sacred Water Offering Ceremony", location: "Guhanthaara Devalaya" }
      ]
    },
    {
      day: "July 28, 2025",
      events: [
        { time: "4:00 AM", activity: "Morning Abhishekam", location: "Guhanthaara Devalaya" },
        { time: "6:00 AM", activity: "Group Meditation & Prayers", location: "Dakshina Kailasa Kshethra" },
        { time: "8:00 AM", activity: "Prasadam Distribution", location: "Temple Premises" },
        { time: "10:00 AM", activity: "Return Journey Begins", location: "Kailasagiri Guhanthaara Devalaya" },
        { time: "6:00 PM", activity: "Arrival & Closing Ceremony", location: "Chintamani" }
      ]
    }
  ];

  return (
    <section id="details" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Event Details &
            <span className="block text-saffron mt-2">Sacred Guidelines</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-sunrise text-white border-0 shadow-divine">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <CardTitle className="text-xl">Duration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold">Shravanmasa</p>
                <p className="text-sm opacity-90">3 Days Sacred Journey</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-divine text-white border-0 shadow-divine">
              <CardHeader className="text-center">
                <Route className="h-12 w-12 mx-auto mb-4" />
                <CardTitle className="text-xl">Distance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold">6-7 km</p>
                <p className="text-sm opacity-90">Sacred Walking Route</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-sacred text-white border-0 shadow-divine">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <CardTitle className="text-xl">Expected</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold">1000+ Devotees</p>
                <p className="text-sm opacity-90">First-time Historic Event</p>
              </CardContent>
            </Card>
          </div>

          {/* Schedule */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
              Sacred Yatra Schedule
            </h3>
            <div className="space-y-8">
              {schedule.map((day, dayIndex) => (
                <Card key={dayIndex} className="bg-white/90 backdrop-blur-sm border border-saffron/20">
                  <CardHeader className="bg-gradient-to-r from-saffron to-sacred-red text-white">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Calendar className="h-6 w-6" />
                      {day.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                          <div className="bg-saffron text-white px-3 py-1 rounded-full text-sm font-semibold min-w-fit">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {event.time}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{event.activity}</h4>
                            <p className="text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <Card className="bg-white/90 backdrop-blur-sm border border-saffron/20">
            <CardHeader className="bg-gradient-divine text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                Sacred Guidelines for Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                    <div className="bg-saffron text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-foreground">{guideline}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
