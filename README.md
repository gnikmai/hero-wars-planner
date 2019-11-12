# iop-boilerplate-jekyll

Common boilerplate for creating Jekyll sites at Ideas On Purpose.

## Getting Started

Assuming `npm` and `jekyll` are installed and working correctly on your machine:

- Open a terminal window and navigate to the desired location for your new project, then run:
- `git clone git@gitlab.com:ideasonpurpose/iop-boilerplate-jekyll.git .` - download a copy of this repository into the current terminal location.
- `npm install` - install project dependencies, then
- `npm run start` - start the development environment at [//localhost:3000](http://localhost:3000)
- `npm run build` - build the site for production delivery.

Once `npm run build` finishes all the tasks, the `_site` directory contents are ready for production delivery.

As soon as everything is setup, remember to **update the package.json file** with the correct project information.

## Available commands
- `npm run start` - development environment
- `npm run build` - production build
- `npm run clean` - cleans all the generated files during development time
- `npm run bundler` - updates the Jekyll bundler

## Production delivery Checklist
- `config.yml` variables MUST be assigned before delivery.
- `favicon.html` setup MUST be complete before delivery
- `meta_tags.html` setup MUST be complete before delivery

WIP...

