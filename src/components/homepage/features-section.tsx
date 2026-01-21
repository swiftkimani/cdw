import { imageSources } from "@/config/constants";

export const FeaturesSection = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-8xl sm:text-center">
          <h2 className="text-base md:text-2xl font-semibold leading-7 text-gray-700 dark:text-gray-300">
            We've got what you need
          </h2>
          <h2 className="mt-2 uppercase text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-8xl">
            No car? No problem
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Our exclusive collection offers unmatched luxury and speed for the
            ultimate driving experience
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16 -mb-16 sm:-mb-24 xl:mb-0">
        <div
          className="mx-auto max-w-7xl h-[300px] bg-cover bg-no-repeat bg-bottom xl:rounded-t-xl shadow-2xl"
          style={{
            backgroundImage: `url(${imageSources.featureSection})`,
          }}
        />
        <div aria-hidden="true" className="relative hidden xl:block">
          <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white to-transparent dark:from-gray-900 pt-[3%]" />
        </div>
      </div>
    </div>
  );
};

