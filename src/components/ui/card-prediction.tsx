import { useState, useEffect } from "react";
import Image from "next/image";

type Option = {
  id: number;
  option_text: string;
  option_image: string | null;
  vote_count: number;
  percentage: string;
  order: number;
};

type Poll = {
  id: number;
  title: string;
  description: string;
  options: Option[];
  total_votes: number;
  has_user_voted: boolean;
};

export function PredictionCard({ poll }: { poll: Poll }) {
  return (
    <article className="font-lato flex min-h-[414px] min-w-[380px] md:min-w-[450px] flex-col justify-center rounded-2xl bg-[#000000A3] bg-[url(/poll-bg-img.jpg)] bg-cover bg-center px-3.5 py-8 text-white bg-blend-overlay">
      {/* Title / Description */}
      <section className="mb-4 text-center text-xl tracking-[0.19px]">
        <p className="mb-2 font-bold">{poll?.title}</p>
        <p className="text-[13px] font-semibold">{poll?.description}</p>
      </section>

      {/* Options */}
      <section className="grid gap-y-2.5 px-2.5 py-3.5">
        {poll?.options?.map((opt) => (
          <PoolBar
            key={opt.id}
            text={opt.option_text}
            percentage={opt.percentage}
            image={opt.option_image}
          />
        ))}
      </section>

      {/* Total Votes */}
      <p className="mt-auto text-center text-xs opacity-70">
        {poll?.total_votes} total votes
      </p>
    </article>
  );
}





export function PredictionCard2({ poll }: { poll: any }) {
  const [showTips, setShowTips] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const isExpanded = showTips && selectedTip === poll?.id;

  return (
    <article
      onClick={() => setSelectedTip(poll?.id)}
      className={`font-lato min-h-[414px] min-w-[450px] relative flex flex-col justify-between rounded-2xl text-white overflow-hidden transition-all duration-500`}
     
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url(/naija-flag.jpg)] bg-cover bg-center" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000000A3]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-2.5 py-5">
        {/* Title + description */}
        <section className="mb-4 text-center text-xl font-bold tracking-[0.19px]">
          <p className="mb-2">{poll?.title}</p>
          <p className="text-[13px] font-normal">{poll?.description}</p>
        </section>

        {/* Options */}
        <section className="mb-4 grid gap-y-2.5 px-2.5 py-3.5">
          {poll?.options?.map((option: any) => (
            <PoolBar
              key={option.id}
              text={option.option_text}
              percentage={option.percentage}
              image={option.option_image}
            />
          ))}
        </section>

        {/* Tips Section */}
        {poll?.has_tips && (
          <section className="mt-auto">
            <button
            type="button"
              onClick={() => {
                setShowTips(!showTips);
              }}
              className="cursor-pointer font-poppins w-full rounded-xl bg-[#FFCC00] py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              {isExpanded ? "Hide Tips" : `View Tips (${poll?.tips_count})`}
            </button>

            {/* Show tips if expanded */}
            {isExpanded && (
              <div className="mt-4 space-y-3">
                {poll?.tips?.map((tip: any) => (
                  <div
                    key={tip.id}
                    className="rounded-lg border border-gray-500 bg-black/40 p-3 text-sm"
                  >
                    <h4 className="font-semibold text-[#FFCC00]">
                      {tip.title}
                    </h4>
                    <p className="mt-1 text-gray-200 text-[13px] leading-relaxed">
                      {tip.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                      <span>Reliability: {tip.reliability_level}</span>
                      <span>Score: {tip.reliability_score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </article>
  );
}





const PoolBar = ({
  text,
  percentage,
  image,
}: {
  text: string;
  percentage: string;
  image?: string | null;
}) => {
  const width = `${percentage}%`;

  return (
    <div className="relative h-10 overflow-hidden rounded-full bg-[#8B8B8BA1] text-xs font-bold flex items-center">
      {/* Filled bar */}
      <div
        className="h-full flex items-center bg-[#141414] px-3.5 transition-all duration-500"
        style={{ width }}
      >
        {image && (
          <Image
            src={image}
            alt={text}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
        )}
        {text}
      </div>

      {/* Percentage */}
      <span className="absolute top-1/2 right-3.5 -translate-y-1/2 text-white">
        {percentage}%
      </span>
    </div>
  );
};
