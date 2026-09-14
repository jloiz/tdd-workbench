import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    chaiConfig: {
      truncateThreshold: 0,   // never truncate diffs
      showDiff: true,         // ensure diff is shown
      diff: true,             // enable diff mode
      maxDepth: null          // print full nested objects
    }
  }
})
