import {
  FootballIcon,
  HomeIcon,
  ThreeUsersIcon,
  TransferIcon,
  TwoTags,
} from "@/components/svgs";

export const lists = [
  { title: "news", path: "/football/super-eagles/news" },
  { title: "summary", path: "/football/super-eagles/summary" },
  { title: "matches", path: "/football/super-eagles/matches" },
  { title: "squad", path: "/football/super-eagles/squad" },
  { title: "statistics", path: "/football/super-eagles/statistics" },
  { title: "trophies", path: "/football/super-eagles/trophies" },
  { title: "teams", path: "/football/super-eagles/all-teams" },
  { title: "leagues & cup", path: "/football/super-eagles/leagues-&-cups" },
  { title: "venue", path: "/football/super-eagles/venue" },
];

export const headerNavLinks = [
  { path: "/", title: "Home", id: 0, exact: true },
  // { path: "/football/super-eagles", title: "News", id: 1 },
  { path: "/football/competitions/news", title: "News", id: 1 },
  { path: "/football/competitions/scores-and-fixtures", title: "Scores & Fixture", id: 2 },
  { path: "/football/competitions/table", title: "Tables", id: 3 },
  { path: "/transfer", title: "Transfer", id: 4 },
  {
    title: "all teams",
    id: 5,
    dropdownLinks: [
      {
        title: "Super eagle",
        links: [
          { path: "", title: "Fixtures & Results", id: 0 },
          { path: "", title: "Tables", id: 1 },
          { path: "", title: "Statistics", id: 2 },
          { path: "", title: "News", id: 3 },
        ],
      },
      {
        title: "super falcon",
        links: [
          { path: "", title: "Fixtures & Results", id: 0 },
          { path: "", title: "Tables", id: 1 },
          { path: "", title: "Statistics", id: 2 },
          { path: "", title: "News", id: 3 },
        ],
      },
      {
        title: "links",
        links: [
          { path: "", title: "Nigeria Under 21", id: 0 },
          { path: "", title: "Nigeria Under 17", id: 1 },
          { path: "", title: "News", id: 2 },
        ],
      },
    ],
  },
  {
    title: "leagues & cups",
    id: 6,
    dropdownLinks: [
      {
        title: "Super eagle",
        links: [
          { path: "", title: "Fixtures & Results", id: 0 },
          { path: "", title: "Tables", id: 1 },
          { path: "", title: "Statistics", id: 2 },
          { path: "", title: "News", id: 3 },
        ],
      },
      {
        title: "super falcon",
        links: [
          { path: "", title: "Fixtures & Results", id: 0 },
          { path: "", title: "Tables", id: 1 },
          { path: "", title: "Statistics", id: 2 },
          { path: "", title: "News", id: 3 },
        ],
      },
      {
        title: "links",
        links: [
          { path: "", title: "Nigeria Under 21", id: 0 },
          { path: "", title: "Nigeria Under 17", id: 1 },
          { path: "", title: "News", id: 2 },
        ],
      },
    ],
  },
  { path: "/historical-records", title: "Videos", id: 7 },
  {
    title: "more",
    id: 8,
    dropdownLinks: [
      {
        title: "more",
        links: [
          { path: "/fan-zone", title: "Fan zone", id: 0 },
          { path: "/historical-records", title: "Historical records", id: 1 },
          { path: "/grass-root", title: "grass root", id: 2 },
          {
            path: "/polls-and-predictions",
            title: "Polls and Predictions",
            id: 3,
          },
          { path: "", title: "players abroad", id: 4 },
        ],
      },
    ],
  },
];

export const mobileHeaderNavLinks = [
  {
    path: "/",
    title: "Home",
    id: 0,
    exact: true,
    icon: <HomeIcon className="h-[1.125rem] w-[1.125rem]" />,
  },
  {
    path: "/football/competitions/news",
    title: "Football",
    id: 1,
    icon: <FootballIcon className="h-[1.125rem] w-[1.125rem]" />,
  },
  {
    path: "/transfer",
    title: "Transfer",
    id: 2,
    icon: <TransferIcon className="h-[1.125rem] w-[1.125rem]" />,
  },
  {
    path: "/fan-zone",
    title: "Fan Zone",
    id: 3,
    icon: <ThreeUsersIcon className="h-[1.125rem] w-[1.125rem]" />,
  },
  {
    path: "/historical-records",
    title: "Historical Records",
    id: 4,
    icon: <TwoTags className="h-[1.125rem] w-[1.125rem]" />,
  },
];
