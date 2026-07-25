# PBTask2

PetBacker Vue programmer test Task 2. Infinite scroll Vue.JS website. Mobile view priority

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

## Decisions / Improvements

- Use Quasar for infinite scroll and q intersection to check last batch midpoint item. Decided to not use Quasar CLI because plain Vue is enough and that will only make it bloated.
- Content can be video or images. Muted and autoplay; no jumpscare but also no effort to start the video
- Should do better with the style if have more time
- Maybe add a to-the-top button
