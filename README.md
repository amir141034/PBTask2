# Task 2 - Infinite Scroll Content Feed

A mobile-first Vue.js website that displays a feed of content (title, description, first photo) from the PetBacker moments API, with infinite scroll pagination and preloading.

## Features

- Fetches and displays content from the API; Title, Description and Content
- Preloading; halfway through the last batch content
- Loader
- Mobile viewports prioritise

## Tech Stack

- Vue 3
- Vite
- Quasar (UI library only)
- Axios

## Installation

Clone the repository:

```bash
git clone https://github.com/amir141034/PBTask2.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
├── pages/
├── composables/
└── utils/
```

## Deployed in Github Pages

Link: https://amir141034.github.io/PBTask2/

## API Notes

- First page: https://pbapi.forwen.com/v5/moments?refresh=1&type=0&auth=0&per_page=8
- Subsequent pages: repeat the same call, adding the Tag into header returned in the response header from the previous call. No page number is needed — the server returns the next batch automatically based on the Tag.

## Decisions / Improvements

- Leveraged Quasar's `QInfiniteScroll` and `QIntersection` components to detect when the midpoint item of the current batch enters the viewport, triggering preload of the next page ahead of time
- Opted for plain Vue over the full Quasar CLI for this task, keeping the bundle lightweight since the project's scope didn't require the additional framework overhead
- Supported both image and video content types; videos are muted and set to autoplay for a smooth, non-intrusive browsing experience without requiring user interaction to start playback
- Further visual polish is planned for future iterations to enhance overall styling
- A "scroll to top" button is planned as a future enhancement to improve navigation on longer feeds
