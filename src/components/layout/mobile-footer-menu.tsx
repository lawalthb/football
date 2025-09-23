import Link from "next/link";
import SearchIcon, { LogoutIcon, UserIcon } from "../svgs";
import Search from "../ui/search";

export default function MobileFooterMenu() {
  return (
    <footer className="bg-primary font-bai-jamjuree fixed bottom-0 left-0 z-50 grid w-full grid-cols-3 px-3.5 py-3 text-sm font-medium tracking-[0.2px] text-white lg:hidden">
      <div className="flex flex-col items-center">
        {/* <SearchIcon className="h-6 w-6" /> */}
        <div className="size-10">
         <Search isMobileFooter={true} />
        </div>
        Search
      </div>
      <Link href="/profile" className="flex flex-col gap-y-2 items-center">
        <UserIcon className="size-8" />
        Profile
      </Link>
      <div className="flex flex-col gap-y-2 items-center cursor-pointer">
        <LogoutIcon className="size-8" />
        Logout
      </div>
    </footer>
  );
}
