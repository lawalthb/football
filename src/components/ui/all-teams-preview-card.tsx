"use client";

import Image from "next/image";
import SubTitle from "./subtitle";
import { fifaToIso2 } from "../methods";
import { addMinutes, format, parseISO } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";

// ----------------------
// Types
// ----------------------
interface Contestant {
  code: string;
  name: string;
}

interface MatchInfo {
  id: string;
  contestant: Contestant[];
  time: string; // e.g., "19:00:00Z"
}

interface Fixture {
  matchInfo: MatchInfo;
}

interface MatchPreviewCardProps {
  filteredfixtures: Fixture[];
   title: string;
   type: string;
   tournamentName: string;
}

interface Competition {
  name: string;
}

interface MatchInfo {
  id: string;
  contestant: Contestant[];
  time: string;
  competition?: Competition;
}

interface LiveData {
  matchDetails?: {
    scores?: {
      ft?: {
        home?: number;
        away?: number;
      };
    };
  };
}

interface Fixture {
  matchInfo: MatchInfo;
  liveData?: LiveData;
}


// ----------------------
// Main Card Component
// ----------------------
export default function AllMatchesPreviewCard({ filteredfixtures, title, type, tournamentName }: MatchPreviewCardProps) {
 
  const matchData = filteredfixtures
  return (
    <section className="font-lato rounded-md bg-white px-3 py-5 shadow-sm">
      {/* <SubTitle title={title} /> */}

      <ul className="mt-3 divide-y divide-gray-100">
        <div className="text-center w-full mb-2 bg-[#E6F3EE] py-[9px]">{tournamentName}</div>
        {matchData?.map((fixture) => (
          <MatchPreview
            key={fixture?.matchInfo?.id}
            id={fixture?.matchInfo?.id}
            contestants={fixture.matchInfo.contestant}
            time={fixture.matchInfo.time}
            liveData={fixture?.liveData}
            type={type}
            showFlag ={fixture?.matchInfo?.competition?.name !== 'NPFL'}
            // detail={detail}
          />
        ))}
      </ul>
      <div className="my-5">
      </div>
    </section>
  );
}

// ----------------------
// Match Preview Row
// ----------------------
interface LiveData {
  matchDetails?: {
    scores?: {
      ft?: {
        home?: number;
        away?: number;
      };
    };
  };
}

interface MatchPreviewProps {
  contestants: Contestant[];
  time: string;
  liveData?: LiveData
  type?: string
  id?: string
  showFlag?: boolean
}


const MatchPreview = ({ contestants, time, liveData, type, id, showFlag }: MatchPreviewProps) => {
  const [home, away] = contestants ?? [];
   const params = useParams();
     
       const country = params.id as string;

  // Safe fallback codes
  const homeCode = home?.code ?? "xx";
  const awayCode = away?.code ?? "xx";

  // Map FIFA code → ISO2 for flagcdn
   const homeCountryCode = fifaToIso2[homeCode];
  const awayCountryCode = fifaToIso2[awayCode];

  const homeFlag = homeCountryCode ? `https://flagcdn.com/w40/${homeCountryCode}.png` : null;
  const awayFlag = awayCountryCode ? `https://flagcdn.com/w40/${awayCountryCode}.png` : null;

  const homeScore = liveData?.matchDetails?.scores?.ft?.home
  const awayScore = liveData?.matchDetails?.scores?.ft?.away

  // ----------------------
  // Time Formatting
  // ----------------------
  let formattedTime = "TBD";
  try {
    // Parse as ISO date (force a valid date string)
    const parsedDate = parseISO(`1970-01-01T${time}`);
    // Adjust timezone (e.g., IST = +330 min) — can make dynamic later
    const adjustedDate = addMinutes(parsedDate, 330);
    formattedTime = format(adjustedDate, "h:mm a");
  } catch {
    // fallback handled by formattedTime = "TBD"
  }

  return (
    <li className="flex items-center justify-center py-2 text-xs even:bg-gray-50">
    {home?.name &&  <>
      
      {/* Home */}
      <div className="flex flex-1 items-center justify-end gap-x-2 pr-2">
        <Link href={`/football/${home?.name.replace(/\s+/g, '-')}?fixture=${id}`}  className="truncate font-medium text-gray-800">{home?.name ?? "Unknown"}</Link>
       {homeFlag && showFlag &&  <Image
          src={homeFlag}
          alt={`${home?.name ?? "Unknown"} flag`}
          width={24}
          height={24}
          className="rounded"
        />}
      </div>

      {/* liveData */}
      <>
      
      {type === 'Played'  && <Link href={`/football/${country?.replace(/\s+/g, '-')}/matches?fixture=${id}`} className="mx-2 shrink-0 rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
        {homeScore} - {awayScore}
      </Link>}
      
      {type === 'Fixture' && <div className="mx-2 shrink-0 rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
        {formattedTime}
      </div>}
      </>

      {/* Away */}
      <div className="flex flex-1 items-center gap-x-2 pl-2">
        {awayFlag && showFlag && <Image
          src={awayFlag}
          alt={`${away?.name ?? "Unknown"} flag`}
          width={24}
          height={24}
          className="rounded"
        />}
        <Link  href={`/football/${away?.name.replace(/\s+/g, '-')}?fixture=${id}`} className="truncate font-medium text-gray-800">{away?.name ?? "Unknown"}</Link>
      </div>
      </>}
      
    </li>
  );
};
