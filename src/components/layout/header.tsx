"use client";

import Image from "next/image";
import Link from "next/link";
import NavLink from "../ui/navlink";
import SearchIcon, { CloseIcon } from "../svgs";
import { headerNavLinks, mobileHeaderNavLinks } from "@/constants/data";
import Search from "../ui/search";

export default function Header() {
  return (
    <>
      <header className="bg-primary relative items-center justify-between px-3.5 pb-5 lg:flex lg:pb-0 xl:px-[6.25rem]">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center justify-between pt-12 lg:pt-0">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Nigeria football.com logo"
              width={158.18}
              height={62}
            />
          </Link>

          <button>
            <Image
              src="/hamburger.svg"
              alt="hamburger menu"
              width={32}
              height={32}
              className="block md:hidden"
            />
          </button>
        </div>

        {/* Navigation links desktop */}
        <nav className="font-mulish hidden lg:block lg:h-[102px]">
          <ul className="flex h-full text-xs font-semibold text-white xl:text-sm">
            {headerNavLinks.map(({ path, title, id, exact, dropdownLinks }) => (
              <li
                key={id}
                className="group hover:bg-primary-light/10 transition-color flex h-full items-center duration-300 ease-in-out"
              >
                {!path && dropdownLinks ? (
                  <>
                    <button className="flex h-full cursor-pointer items-center gap-x-2.5 px-3 capitalize transition-opacity duration-300 ease-in-out group-hover:opacity-100 xl:px-5">
                      {title}
                      <Image
                        src="/chevron.svg"
                        alt="chevron"
                        width={12}
                        height={6}
                        className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
                      />
                    </button>

                    {true && (
                      <div className="invisible absolute top-full left-1/2 z-50 flex w-full -translate-x-1/2 translate-y-10 transform justify-between bg-white px-48 py-6 text-black opacity-0 shadow-md transition-all delay-150 duration-500 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        {dropdownLinks.map(({ title, links }) => (
                          <DropdownSection
                            key={title}
                            title={title}
                            links={links}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    href={path}
                    exact={exact}
                    className="px-3 opacity-90 transition-all duration-300 ease-in-out hover:opacity-100 xl:px-5"
                  >
                    {title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Search />
      </header>

      {/* Mobile Navigation Links */}
      <nav className="bg-primary-dark p-2.5 lg:hidden">
        <ul className="no-scrollbar flex items-center gap-y-1 overflow-x-auto">
          {mobileHeaderNavLinks.map(({ path, title, id, icon }) => (
            <li key={id} className="shrink-0">
              <Link
                href={path}
                className="font-mulish flex flex-col items-center px-3.5 text-xs leading-5 font-semibold text-white"
              >
                {icon}
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function DropdownSection({
  title,
  links,
}: {
  title: string;
  links: { path: string; title: string; id: number }[];
}) {
  return (
    <section className="w-full text-[#1E1E1E] lg:max-w-[198px]">
      <h3 className="border-b-primary mb-5 border-b-2 pb-2.5 font-bold uppercase">
        {title}
      </h3>
      <ul className="grid gap-y-5">
        {links.map((item) => (
          <li key={item.id}>
            <Link
              href={item.path}
              className="group flex text-sm font-semibold capitalize"
            >
              <div className="flex shrink-0 items-center border-b border-b-[#E6F3EE] pr-3">
                <Image src="/whistle.svg" alt="" width={18.04} height={9.85} />
              </div>
              <span className="border-b-primary-light hover:border-b-primary inline-block grow border-b-2 py-1 transition-all duration-300 ease-in-out hover:pl-4">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
