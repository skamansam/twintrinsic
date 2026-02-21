import { default as netlifyAdapter } from "@sveltejs/adapter-netlify"
import { default as vercelAdapter } from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"


let adapter;
let options;
// if (process.env.VERCEL_ENV) {
  adapter = vercelAdapter;
  options = {out: "dist"};
// } else {
//   adapter = netlifyAdapter;
//   options = {
//     edge: false,
//     split: false,
//   };
// }

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(options),
  },
}

export default config
