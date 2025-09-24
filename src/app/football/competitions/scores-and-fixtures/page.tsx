"use client";

import { useFootballStore } from "@/store/footballStore";
import Ads from "@/components/ui/ad";
import { useState } from "react";
import AllMatchesPreviewCard from "@/components/ui/all-teams-preview-card";
import DateCarousel from "@/components/ui/dateCarousel";
import { Fixture } from "@/types/football.types";
import { format, parseISO } from "date-fns";

export default function ScoresAndFixtures() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

 
    

   const { fixtures } =
      useFootballStore();

 // If a date is selected, filter by it
  const filteredFixtures = fixtures.filter((fixture) => {
    const fixtureDate = format(parseISO(fixture?.matchInfo?.date), "yyyy-MM-dd");
    return fixtureDate === selectedDate;
  });


   const grouped = filteredFixtures.reduce<Record<string, Fixture[]>>((acc, fixture) => {
    const compName = fixture.matchInfo.competition.name;
    if (!acc[compName]) {
      acc[compName] = [];
    }
    acc[compName].push(fixture);
    return acc;
  }, {});

  return (
    <main className="w-full pt-5 pb-5 lg:px-20 lg:pt-12 lg:pb-[6.25rem]">
      <section className="mb-5 flex flex-col gap-5 lg:mb-28 items-center my-5">
        <DateCarousel onDateSelect={handleDateChange} />
         <div className="w-full">

          {Object.entries(grouped).map(([competitionName, matches], index) => <AllMatchesPreviewCard key={index} type = 'Fixture'  filteredfixtures={matches} tournamentName={competitionName} />)}
          <Ads />
         </div>
         
      </section>
    </main>
  );
}
