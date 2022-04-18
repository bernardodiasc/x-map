# X-World-Map

World map to display people, events, travels and more.

- Website: [x-world-map.com](https://x-world-map.com/)
- Design System: [x-world-map.com/docs](https://x-world-map.com/docs/)

## Getting Started

First create a `.env.local` in the root of this project and add the keys:

### X-World-Map API

```
NEXT_PUBLIC_API_URL=http://localhost:1337
```

The URL refers to the setup https://github.com/bernardodiasc/x-world-map-api

### Google Maps API

```
NEXT_PUBLIC_GMAPS_API_KEY
```

The Google Maps API key is required to appropriatedly load the map. In order to get the key you must create a new project at Google Cloud, then activate the **Maps Javascript API** and **Geocoding API** for this new project. It will require to add Billing details, but no worries, for development purposes it should stay below the charged range.

### Development

Install dependencies:

```bash
yarn install
```

Run the app:

> Make sure you have the [x-world-map-api](https://github.com/bernardodiasc/x-world-map-api) running also

```bash
yarn develop
```

#### Design System

```bash
yarn storybook
```
