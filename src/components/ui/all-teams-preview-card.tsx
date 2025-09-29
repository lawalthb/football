"use client";

import Image from "next/image";
import { fifaToIso2 } from "../methods";
import { addMinutes, format, parseISO } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Contestant, Fixture } from "@/types/football.types";

// ----------------------
// Types
// ----------------------

interface MatchPreviewCardProps {
  filteredfixtures: Fixture[];
  type: string;
  tournamentName: string;
}

// ----------------------
// Main Card Component
// ----------------------
export default function AllMatchesPreviewCard({
  filteredfixtures,
  type,
  tournamentName,
}: MatchPreviewCardProps) {
  const matchData = filteredfixtures;
  return (
    <section className="font-lato rounded-md bg-white px-3 py-5 shadow-sm">
      <ul className="mt-3 divide-y divide-gray-100">
        <li className="mb-2 w-full list-none bg-[#E6F3EE] py-[9px] text-center">
          {tournamentName}
        </li>
        {matchData?.map((fixture) => (
          <MatchPreview
            key={fixture?.matchInfo?.id}
            id={fixture?.matchInfo?.id}
            contestants={fixture.matchInfo.contestant}
            time={fixture.matchInfo.time}
            liveData={fixture?.liveData}
            type={type}
            showFlag={fixture?.matchInfo?.competition?.name !== "NPFL"}
            // detail={detail}
          />
        ))}
      </ul>
      <div className="my-5"></div>
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
  liveData?: LiveData;
  type?: string;
  id?: string;
  showFlag?: boolean;
}

const MatchPreview = ({
  contestants,
  time,
  liveData,
  type,
  id,
  showFlag,
}: MatchPreviewProps) => {
  const [home, away] = contestants ?? [];
  const params = useParams();
  const country = params.id as string;

  // Safe fallback codes
  const homeCode = home?.code ?? "xx";
  const awayCode = away?.code ?? "xx";

  // Map FIFA code → ISO2 for flagcdn
  const homeCountryCode = fifaToIso2[homeCode];
  const awayCountryCode = fifaToIso2[awayCode];

  const homeFlag = homeCountryCode
    ? `https://flagcdn.com/w40/${homeCountryCode}.png`
    : null;
  const awayFlag = awayCountryCode
    ? `https://flagcdn.com/w40/${awayCountryCode}.png`
    : null;

  const homeScore = liveData?.matchDetails?.scores?.ft?.home;
  const awayScore = liveData?.matchDetails?.scores?.ft?.away;

  // ----------------------
  // Time Formatting
  // ----------------------
  let formattedTime = "TBD";
  try {
    const parsedDate = parseISO(`1970-01-01T${time}`);
    const adjustedDate = addMinutes(parsedDate, 330); // offset for IST (example)
    formattedTime = format(adjustedDate, "h:mm a");
  } catch {
    // fallback handled
  }

  return (
    <li className="flex items-center justify-center py-2 text-xs even:bg-gray-50">
      {home?.name && (
        <>
          {/* Home */}
          <div className="flex flex-1 items-center justify-end gap-x-2 pr-2">
            <Link
              href={`/football/${home?.name.replace(/\s+/g, "-")}?fixture=${id}`}
              className="truncate font-medium text-gray-800"
            >
              {home?.name ?? "Unknown"}
            </Link>
            {homeFlag && showFlag && (
              <Image
                src={homeFlag}
                alt={`${home?.name ?? "Unknown"} flag`}
                width={24}
                height={24}
                className="rounded"
              />
            )}
          </div>

          {/* Middle: Score if played, Time if fixture */}
          {type === "Played" ? (
            <Link
              href={`/football/${country?.replace(/\s+/g, "-")}/matches?fixture=${id}`}
              className="mx-2 shrink-0 rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700"
            >
              {homeScore} - {awayScore}
            </Link>
          ) : (
            <div className="mx-2 shrink-0 rounded bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
              {formattedTime}
            </div>
          )}

          {/* Away */}
          <div className="flex flex-1 items-center gap-x-2 pl-2">
            {awayFlag && showFlag && (
              <Image
                src={awayFlag}
                alt={`${away?.name ?? "Unknown"} flag`}
                width={24}
                height={24}
                className="rounded"
              />
            )}
            <Link
              href={`/football/${away?.name.replace(/\s+/g, "-")}?fixture=${id}`}
              className="truncate font-medium text-gray-800"
            >
              {away?.name ?? "Unknown"}
            </Link>
          </div>
        </>
      )}
    </li>
  );
};
