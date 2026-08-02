<template>
  <section class="relative h-dvh w-full overflow-hidden font-sans">
    <img
      src="/img/homepage-hero.jpg"
      alt="Alpine lake beneath a snow-streaked mountain range"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/95"
    />

    <div class="absolute inset-0 z-10 flex flex-col justify-center px-40">
      <div class="max-w-7xl">
        <p class="mt-3 text-6xl text-white font-bold">Find your crew</p>
        <h1 class="font-sans font-bold text-[175px] leading-none text-white">
          Let's Summit
        </h1>
        <div>
          <button
            class="rounded-full bg-white text-black font-medium py-2 px-4 cursor-pointer hover:bg-gray-300 transition duration-300"
          >
            Explore trips
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
