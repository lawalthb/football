import SearchIcon, { CloseIcon } from "../svgs";

const Search = ({isMobileFooter = false}) => {
    return <div className="relative">{/* Open search dropdown */}
        <label
          htmlFor="openSearchModal"
          className={`group peer ${isMobileFooter ? 'flex p-2' : 'hidden lg:flex px-5 py-2.5'}  w-full cursor-pointer items-center rounded-full border border-[#FFFFFF4F]  transition-all duration-300 ease-in-out hover:bg-white lg:h-11 lg:w-11 lg:justify-center lg:px-0 lg:py-0`}
        >
          <input
            type="radio"
            id="openSearchModal"
            name="searchModal"
            className="peer hidden"
          />
          <SearchIcon className="group-hover:text-primary transition-color h-[1.125rem] w-[1.125rem] text-white delay-200 duration-300 ease-in-out" />
        </label>
        {/* Close search dropdown */}
        <label
          htmlFor="closeSearchModal"
          className="fixed top-14 right-3.5 z-50 hidden cursor-pointer peer-has-checked:block lg:right-32"
        >
          <input
            type="radio"
            name="searchModal"
            id="closeSearchModal"
            className="hidden"
            defaultChecked
          />
          <CloseIcon />
        </label>

        {/* Search dropdown */}
        <div className="fixed top-0 left-0 z-40 hidden h-dvh w-full bg-white/85 px-3.5 py-24 backdrop-blur-[6.3px] peer-has-checked:block">
          <section className="mx-auto max-w-[671px]">
            <div className="mb-4 flex w-full items-center gap-x-6 rounded-full border border-[#d9d9d9] bg-white px-6">
              <input
                type="text"
                className="grow bg-transparent py-4 focus:outline-none"
                id="search"
                placeholder="Search match or team/players"
              />
              <SearchIcon className="h-[1.125rem] w-[1.125rem] text-neutral-200" />
            </div>

            <div className="border-b-primary font-lato border-b-2 py-2.5 text-sm font-bold text-[#1e1e1e]">
              NO RESULTS
            </div>
          </section>
        </div></div>
}

export default Search;