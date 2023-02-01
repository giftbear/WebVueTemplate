# WebVueTemplate
Web APP common template based on vue

## What components it have?
1. Navigation
* Horizontal/Vertical
* Collapse/Extend
* Anchor
2. Table
* Table tools (Add, Edit, Delete, Search, Export)
* Pagination
3. Login/Register

## How to use?
1. Installation of dependencies: `npm install`
2. Run in development enviroment: `npm run serve`
3. Pacakage: `npm run build`
4. Deployment:
* Place dist folder to your project directory and modify the nginx configure file
* `/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf` (Linux)
* `start nginx` / `nginx -s quit` (Windows)

*How to install vue-cli?*`npm install -g @vue/cli`

*How to create vue-cli project?*`vue create <project name>`
