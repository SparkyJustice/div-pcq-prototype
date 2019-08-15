# Divorce Prototype 

## Debugging 

You can debug the application using node-inspector and the chrome dev tools

- Install node-insepctor
- Start debug `npm run-script debug`

This should open a chrome tab that can be used to add break points etc. You can then 
access the application in another tab as normal.

## Running tests

1. To execute Unit tests use `npm run test-unit`
2. To execute Accessibility Tests use `npm run test-a11y`
3. To execute all tests use `npm test`

## Running End to End tests against local/sandbox
To execute end to end test against local environment
  1. Update test/e2e-tests/config/config.json, url to point to local/sandbox
  2. Execute 'npm run test-e2e'



## Running the protoype locally

You can either run the prototype using an in-memory session store or Redis:

- in-memory session store:
  export NODE_ENV=prototype

- Redis session store:
  export REDISCLOUD_URL=redis://<REDIS_IP>:6379

## Other environment variables

- PDF Generation URL:
  export PDF_GENERATOR_SERVICE_URL=http://localhost:3001/petition-pdf

# GOV.UK Prototype kit

## News

**Upgrading from version 1 to 2:** the latest version of the kit (2.0.0 and later) is not compatible with previous versions. If you update your old prototypes you'll need to [convert them as well](https://github.com/alphagov/govuk_prototype_kit/blob/master/docs/updating-the-kit.md).

## About the prototype kit

The prototype kit provides a simple way to make interactive prototypes that look like pages on GOV.UK. These prototypes can be used to show ideas to people you work with, and to do user research.

Read the [project principles](docs/principles.md).

> You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like GOV.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately.

## Installation instructions

- [Installation guide for new users (non technical)](docs/install/introduction.md)
- [Installation guide for developers (technical)](docs/developer-install-instructions.md)

## Guides

1. [Setting up git](docs/guides/setting-up-git.md)
2. [Publishing on the web (Heroku)](docs/guides/publishing-on-heroku.md)
3. [Using GOV.UK Verify](docs/guides/using-verify.md)

## Other documentation

- [Prototype kit principles](docs/principles.md)
- [Making pages](docs/making-pages.md)
- [Writing CSS](docs/writing-css.md)
- [Updating the kit to the latest version](docs/updating-the-kit.md)
- [Tips and tricks](docs/tips-and-tricks.md)
- [Creating routes (server-side programming)](docs/creating-routes.md)
- [Quality assurance (linting)](docs/quality.md)

## Community

We have two Slack channels for the Prototype kit. You'll need a government email address to join them.

* [Slack channel for users of the prototype kit](https://ukgovernmentdigital.slack.com/messages/prototype-kit/)
* [Slack channel for developers of the prototype kit](https://ukgovernmentdigital.slack.com/messages/prototype-kit-dev/)

# Run prototype with proxy:

In order to access the REST api (which, at the moment, is hidden behind a proxy) you need to install [proxychains](https://github.com/haad/proxychains).

After that just execute ``startWithProxy.sh`` to start the application containing the proxy.
