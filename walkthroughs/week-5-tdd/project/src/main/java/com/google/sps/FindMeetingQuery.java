// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

public final class FindMeetingQuery {

  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {

    Collection<String> attendees = request.getAttendees();
    
    // build the list of all events to consider while picking a meeting range 
    ArrayList<TimeRange> allEventRanges = new ArrayList<TimeRange>();
    for (Event event : events) {
      // consider the event as long as there is at least one attendee atending it 
      if (!Collections.disjoint(event.getAttendees(), attendees)) {
        allEventRanges.add(event.getWhen());
      }
    }
    Collections.sort(allEventRanges, TimeRange.ORDER_BY_START); // sort chronologically 

    // compile list of event times with no overlap
    Collection<TimeRange> possibleTimes = new ArrayList<TimeRange>();
    int eventEndTime = TimeRange.START_OF_DAY;   
    for (TimeRange time : allEventRanges) {
      int eventDuration = time.start() - eventEndTime; 
      if (eventDuration >= request.getDuration()) {
        possibleTimes.add(TimeRange.fromStartEnd(eventEndTime, time.start(), false)); // noninclusive
      }
      if (time.end() >= eventEndTime) {
        eventEndTime = time.end();
      }
    }
    if (TimeRange.END_OF_DAY - eventEndTime >= request.getDuration()) {
      possibleTimes.add(TimeRange.fromStartEnd(eventEndTime, TimeRange.END_OF_DAY, true)); // inclusive 
    }

    if (possibleTimes.isEmpty()) {
      return Arrays.asList(); 
    } else {
      return possibleTimes; 
    }  

  }

}