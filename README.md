# CodeLib

- https://vicrodri-codelib.netlify.app/

Example application for an e-commerce site with functional Frontend + Backend with theme selection, user management and order cart management.

## Technologies overview:

Developed using:

- Generated with [Vite](https://vitejs.dev/) using [React + TypeScript Template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- React - [https://react.dev/](https://react.dev/)
- Tailwind CSS - [https://tailwindcss.com/](https://tailwindcss.com/)
- Typescript - [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- React Router - [https://reactrouter.com/en/main](https://reactrouter.com/en/main)
- JSONServer - [JSON Server Stable Github Page](https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#json-server-) using [JSON Server Auth](https://www.npmjs.com/package/json-server-auth) for authentication and route protection
- Netlify - [https://app.netlify.com/](https://app.netlify.com/) for frontend deployment 

## Dependencies

- CodeLib Mock Server - [codelib-mock-server](https://github.com/vicrodri/codelib-mock-server) backend server
  
## How to run

- npm run dev: Launches frontend dev server + watch for changes
- npm run jsonserve: Launches local JSON Server + JSON Server Auth with their files linked and watching for changes
- npm run build: generate code bundle to /build directory