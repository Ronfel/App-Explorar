# AppExplorar

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Firebase Realtime Database

The app uses the Realtime Database in the existing Firebase project. Create a Realtime Database instance in the Firebase console, then copy its database URL (for example, `https://<database-name>.firebasedatabase.app`) into the `databaseURL` field in `src/app/auth/firebase.config.ts`.

To transfer the current local data, import `api/db.json` from the Realtime Database console using **Import JSON**. The file has `categorias` and `lugares` at the root, each represented as an object keyed by the record's existing `id` (not as a JSON array). The app uses those Firebase child keys as record IDs, including in the place detail pages.

The app's protected pages require a signed-in user. Configure the database rules so reads and writes are limited to authenticated users:

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "categorias": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "lugares": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
