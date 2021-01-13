yarn add react@^16.13.1 react-dom@^16.13.1

yarn add @patternfly/patternfly @patternfly/react-core @patternfly/react-table
yarn add @react-keycloak/web keycloak-js

yarn add redux redux-logger redux-thunk

yarn add @redhat-cloud-services/frontend-components-notifications axios typesafe-actions

# Dev dependencies

yarn add -D @types/react @types/react-dom @types/react-router-dom
yarn add -D @types/react-redux @types/redux-logger redux-devtools-extension

yarn add -D axios-mock-adapter

yarn add -D enzyme enzyme-adapter-react-16 jest-enzyme @types/enzyme @types/enzyme-adapter-react-16
yarn add -D @testing-library/react-hooks

yarn add -D husky lint-staged prettier source-map-explorer


## Add to scripts
## "analyze": "source-map-explorer 'build/static/js/*.js'",

## Add to package.json
# "jest": {
#   "collectCoverageFrom": [
#     "src/**/*.{js,jsx,ts,tsx}",
#     "!<rootDir>/node_modules/",
#     "!src/**/*.stories.*"
#   ]
# },
# "husky": {
#   "hooks": {
#     "pre-commit": "lint-staged"
#   }
# },
# "lint-staged": {
#   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
#     "prettier --write"
#   ]
# }
