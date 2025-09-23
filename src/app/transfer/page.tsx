"use client";

import Ads from "@/components/ui/ad";
import { NewsCard } from "@/components/ui/card-news";
import SubTitle from "@/components/ui/subtitle";
import TrendyPost from "@/components/ui/TrendyPost";
import { useFootballStore } from "@/store/footballStore";

export default function SuperEaglesNews() {


   const { categories } =
      useFootballStore();
      
  return (
     <main className="pt-5 pb-5 md:px-32 lg:pt-12 lg:pb-[6.25rem]">
              <TrendyPost categories={categories} news={true}/>
          <section className="mb-5 flex flex-col gap-5 lg:mb-28 lg:items-start my-5">
           
            <aside className="grid gap-y-5 px-2.5 w-full lg:px-0">
              <Ads />
            </aside>
            {categories
                      ?.filter((category) => category?.posts_count > 0)
                      ?.map((category) => {
                       
            
                        return (
                          <section key={category.id} className="grid gap-y-5 lg:gap-y-10">
                            <SubTitle title={category.name} />
                            <div className="grid gap-5 lg:grid-cols-3">
                              {category.posts?.map((post, index) => (
                                <NewsCard
                                  key={index}
                                  media={post.featured_image}
                                  title={post.title}
                                  path={`/blogs/${category.slug}/${post.slug}`}
                                />
                              ))}
                            </div>                          
                          </section>
                        );
                      })}
          </section>
        </main>
  );
}
