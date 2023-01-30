# Setting up a minimal frontend web application

Follow these instructions when setting up a new frontend web project. Your project will use the following tools and libraries:

- NPM to install dependencies.
- `jest` to write and run tests.
- `esbuild` to bundle JS source files.

### 1. Initialise the project directory

This assumes you have `NVM` already installed:

```bash
nvm use node
npm install -g jest esbuild

mkdir my-project-directory
cd my-project-directory/

npm init -y
npm install jest-environment-jsdom
```

### 2. Create files

```bash
touch index.js
touch index.html
```

### 3. Add the HTML scaffold on the page

You can find a lot of HTML "boilerplate" templates online — here's one you can use in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title>My web page</title>
  </head>
  <body></body>
</html>
```

Open the page in your browser:

```bash
open index.html
```

### 4. Add the `build` script to `package.json`

This is so we can run `npm run build` in our terminal to execute `esbuild` to bundle the code.

```json
{
  "name": "my-project-directory",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // add this line:
    "build": "esbuild index.js --bundle  --outfile=bundle.js --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

When we now run `npm run build`, the following command is executed for us by NPM:

```bash
$ esbuild index.js --bundle --outfile=bundle.js --watch
```

- `index.js` is the main file of our JavaScript program. In other words, is the
  file that _requires_ other files, but that is not required by any other.
- `bundle.js` is the name of the bundle file that will be loaded by the
  browser.
- the `--watch` option tells esbuild to automatically regenerate the bundle
  when we change source files.

You can now run `npm run build` and it should generate the file `bundle.js` — leave the command running in a terminal somewhere, otherwise new changes made to your source files won't be watched.

### 5. Load the `bundle.js` file on the page

```html
<!-- add this line at the end of the body -->
<script type="text/javascript" src="bundle.js"></script>
```

### 6. Add files to `.gitignore` and commit your changes

```bash
echo "node_modules" >> .gitignore
echo "bundle.js" >> .gitignore

git init .
git add .
git commit -m "Project setup"
```

## Suggested project structure

There is no idiomatic project structure for JavaScript frontend projects — it will depend heavily on the team, project domain, and/or the framework (or the absence of it).

Therefore, in this module we recommend sticking to a simple enough directory structure that we'd call "flat" — keeping the nesting of directories to a minimum:

```
- my_todo_list_project
  - todoView.js
  - todoView.test.js
  - todoModel.js
  - todoModel.test.js
  - index.js
  - index.html
  - package.json
  - (other files...)
```

Something that is common enough in JS projects is to put all JavaScript files into a directory called `src/`:

```
- my_todo_list_project
  - src/
    - todoView.js
    - todoView.test.js
    - todoModel.js
    - todoModel.test.js
    - index.js
  - bundle.js
  - index.html
  - package.json
  - (other files...)
```

In that case, remember to update your `package.json` so `esbuild` has the right path to the `index.js` file:

```json
{
  "name": "notes",
  // (...)
  "scripts": {
    "build": "esbuild ./src/index.js --bundle  --outfile=bundle.js --watch"
  }
}
```

If you'd like to have a different structure with more directories, you might want to group them by "functionality", e.g have the "View" classes in a `views/` directory, for example.

```
- my_todo_list_project
  - src/
    - views/
      - todoView.js
      - todoView.test.js
    - models/
      - todoModel.js
      - todoModel.test.js
    - index.js
  - index.html
  - package.json
  - (other files...)
```

We recommend keeping the test files close to the source file they test (which is a different approach to other languages and test frameworks, like Ruby/RSpec) — but if you'd like to put all your tests in a separate directory, you can also create a `__tests__` directory at the root of your project:

```
- my_todo_list_project
  - src/
    - views/
      - todoView.js
    - models/
      - todoModel.js
    - index.js
  - __tests__
    - todoView.test.js
    - todoModel.test.js
  - index.html
  - package.json
  - (other files...)
```

In case you have any other (non JavaScript) resources, such as CSS files, images, etc, they can probably be put into a different directory (usually called `assets`, `static` or `resources`, or something similar).

Once again, you shouldn't worry too much about having the "right" structure, as it will vary between teams and projects — focus on having something consistent and that works for you, so you know where to find your files and how to require them without too much confusion.

<!-- BEGIN GENERATED SECTION DO NOT EDIT -->

---

**How was this resource?**  
[😫](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fjavascript-web-applications&prefill_File=pills%2Fsetup_minimal_frontend_webapp.md&prefill_Sentiment=😫) [😕](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fjavascript-web-applications&prefill_File=pills%2Fsetup_minimal_frontend_webapp.md&prefill_Sentiment=😕) [😐](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fjavascript-web-applications&prefill_File=pills%2Fsetup_minimal_frontend_webapp.md&prefill_Sentiment=😐) [🙂](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fjavascript-web-applications&prefill_File=pills%2Fsetup_minimal_frontend_webapp.md&prefill_Sentiment=🙂) [😀](https://airtable.com/shrUJ3t7KLMqVRFKR?prefill_Repository=makersacademy%2Fjavascript-web-applications&prefill_File=pills%2Fsetup_minimal_frontend_webapp.md&prefill_Sentiment=😀)  
Click an emoji to tell us.

<!-- END GENERATED SECTION DO NOT EDIT -->
