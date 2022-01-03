import esbuild from "esbuild";
import {writeFile} from "fs/promises";
const {default: pkg} = await import("./package.json");

let result = await esbuild
  .build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    outfile: "./dist/index.js",
    loader: {".js": "jsx"},
    minify: true,
    metafile: true,
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies ?? {}),
    ],
  })
  .catch(() => process.exit(1));

await writeFile("./meta.json", JSON.stringify(result.metafile, null, 2));
