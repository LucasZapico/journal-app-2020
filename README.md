## Objective

The objective of this project is to make a chronological markdown enabled journal using React hook, context and firebase.

The current status of the app can be [viewed here](https://journal-app-2020.web.app/landing)

### Bugs

- [ ] some changes are not reflected when entry is clicked again.

## Features Todo

_A running todo list because I haven't got around to setting up proper project management for this app._

- [ ] Add a search to the categories section
  - [ ] keyboard shortcut in
- [ ] cookie for the theme so the user  doesn't have to change their theme preference each time
- [ ] add user profile. 
  - [ ] default theme 
  - [ ] profile pic
  - [ ] export all content
- [ ] fix categories to have a unselect 
- [ ] add and and or operations
- [ ] add visual to and and or operations 
- [ ] add a "like" option to landing page and in app
- [ ] add leave a comment on landing page and in app

- [ ] fix inline timestamp feature
- [ ] add tabs for multiple entries open at a time ??
- [ ] ensure focus stays on sentence as typing move down screen.
- [ ] sign out should be fixed at the bottom of the view port
- [ ] save and delete should be fixed within the view port
- [ ] hide sidebar should be fixed within view port
- [ ] style links in previewer
- [x] delete category in entry view on click
- [x] auto resize text area
  - add text area metrics --> word count, reading time
- [x] auto hide sidenav on word count
- [ ] move the getting started part creation to the firebase functions
- [ ] category filter
- [ ] search
- [ ] write firebase storage ruless.
- [x] add syntax based category addition to markdown
- [x] add code preview with styling support
- review general ux
- [x] add auto save and update
- [x] enhance show/hide sidenav
- [x] enhance preview/code/ etc views
- accessibility
- [ ] refine style classes
- [x] add dark mode
- [ ] enhance onboarding --> how to use the product
  - [ ] add tooltip component
  - [ ] add quickguide
- [x] bad url redirect
- [ ] ?? handle quotes ??
- [ ] tabbing does not work in texteditor. It moves you onto the next potential field
- [ ] variable fontsize
- [ ] add a syntax cheat sheet toggle
- [ ] add dark mode
- [ ] easily switch between
- [x] handle dark theme on landing

### House Keeping

- [ ] optimize svg's
- [ ] enhance ui on mobile - svg and reading

#### Category handling

- [ ] remove category from page inline removes from category list... and vice versa

## Ux catch

- [ ] create a loading view

#### Table and mobile view

- [ ] handle categories

### Landing Page

- [ ] add gif for category function

### Api functionalliy

- [ ] snippetes
- [ ] good to go apicd

* **Support Accounts**

- [x] support multiple users
  - [ ] add, remove users
  - [x] add landing page
  - [ ] add getting started first post on user creation

### Brain Storm

- drag and drop categories to group as synonyms
- leave categories case and spaces only sanitize behind the sene

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
