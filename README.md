# scriptable-wild

v4.0.0

<br/>

## What is Scriptable?
A compelling use of Scriptable is using JavaScript to control custom iOS actions (see iOS Shortcuts), device-side and home automation, and on-screen Widgets.

Scriptable provides all the classes needed to interact with the above native iOS features and with the user.

## What is Scriptable *Wild*?
`scriptable_wild` extends the Scriptable ecosystem by providing system classes like File, Url, Repository, Config, Data — making it a lot safer and easier to e.g. write your code in a separate source controlled environment and then deploy it and test with a single button; write your code in TypeScript and then pull the JavaScript; write user libraries; create and mutate files; read and write data for a script you write without having to touch the file system; obtain a secret file from your local disk and load it into Keychain for later use (and configure re-load / key roll); write your config (with auto-merging of app-level and user-level config) in the expected location that your app will automatically pick up (and fail safe if config is invalid or if improperly configured); get results from and return results to iOS Shortcuts; create and mutate URLs, making requests and handling responses for HTTP requests and x-callback-urls, opening the URL in Safari or WebView, opening other iOS url schemes.

## How to use
Note: this project is not production-ready. It runs without failing on my device and with my shortcuts but is still a WIP since it doesn’t have a build test suite and it doesn’t have a user guide / operating instructions. However, if you are an existing Scriptable moderate user, you should be able to figure out how to use it by starting from the ./boot/!boot/Boot.js module, and its corresponding Scriptable boot runner script, ./boot/!boot.js.
