"use client";

import { useFootballStore } from "@/store/footballStore";
import {  getTournamentNavLists } from "@/components/methods";
import Ads from "@/components/ui/ad";
import BreadCrumb from "@/components/ui/bread-crumb";
import MatchPreviewCard from "@/components/ui/card-match-preview";
import LeagueTable from "@/components/ui/league-table";
import NavLinkList from "@/components/ui/navlink-list";
import SubTitle from "@/components/ui/subtitle";
import SwitchView from "@/components/ui/tab-switch-view";
import { useEffect, useState } from "react";
import SwitchViewTab from "@/components/ui/switchViewTab";
import AllMatchesPreviewCard from "@/components/ui/all-teams-preview-card";
import DateCarousel from "@/components/ui/dateCarousel";

export default function ScoresAndFixtures() {
    

   const { fixtures, matchPreview } =
      useFootballStore();

       const tournamentMatchPreviewName = matchPreview?.matchInfo?.competition?.name 
       const tournamentName = tournamentMatchPreviewName 

    

const liveFixturesData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Fixture")

const resultData = fixtures?.filter(fixture => fixture?.liveData?.matchDetails?.matchStatus === "Played")
 const handleDateChange = (date: string) => {
    console.log("Selected date:", date);
    // Fetch fixtures for this date
  };
  return (
    <main className="w-full pt-5 pb-5 lg:px-20 lg:pt-12 lg:pb-[6.25rem]">
      <section className="mb-5 flex flex-col gap-5 lg:mb-28 items-center my-5">
        <DateCarousel onDateSelect={handleDateChange} />
         <div className="w-full">

          <AllMatchesPreviewCard type = 'Fixture' title="Today's Matches / Next Match"  filteredfixtures={fixtures} tournamentName={''} />
         </div>
          <Ads />
         
      </section>
    </main>
  );
}
