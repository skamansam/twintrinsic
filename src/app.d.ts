// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  // biome-ignore lint/style/noNamespace: see the above url for why this namespace is needed
  namespace App {

    // Defines the common shape of expected and unexpected errors. Expected errors are thrown using the error function. Unexpected errors are handled by the handleError hooks which should return this shape.
    interface Error {}

    // The interface that defines event.locals, which can be accessed in server hooks (handle, and handleError), server-only load functions, and +server.js files.
    interface Locals {}

    // Defines the common shape of the page.data state and $page.data store - that is, the data that is shared between all pages. The Load and ServerLoad functions in ./$types will be narrowed accordingly. Use optional properties for data that is only present on specific pages. Do not add an index signature ([key: string]: any).
    interface PageData {}

    //The shape of the page.state object, which can be manipulated using the pushState and replaceState functions from $app/navigation.
    interface PageState {}

    // If your adapter provides platform-specific context via event.platform, you can specify it here.
    interface Platform {}
  }
}

export {}
