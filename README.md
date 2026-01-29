# interview-task-management

# SetUp
- npm init vite@latest
- npm i -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

# TODO
- Add localStorage to keep track of all the data
- Convert it to Typescript

1) Why are you mutating state in Redux?
- Redux Toolkit uses Immer internally, so I can write mutable-looking code that produces immutable updates safely.

- “I use find() instead of filter() since I need a single entity, and I guard against undefined state so the edit page doesn’t crash on refresh.

- I load the initial Redux state from localStorage and subscribe to the store to persist updates. Redux Toolkit handles immutability internally, so syncing with localStorage stays clean and predictable.