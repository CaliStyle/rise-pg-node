# RiSE Payment Gateway SDK

[![NPM version][npm-image]][npm-url]
[![Build Status][ci-image]][ci-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][daviddm-image]][daviddm-url]

Strongly typed Node SDK for RiSE Payment Gateway

# Installation
```
npm install @calistyle/rise-pg-node
```

# Documentation

# Notes

# Usage

## Setup
```js
const RPG = require('@calistyle/rise-pg-node').RPG
const rpg = new RPG({
  userName: 'your-username',
  password: 'your-password'
})
```

[npm-image]: https://img.shields.io/npm/v/@calistyle/hpg-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@calistyle/hpg-node
[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/hpg-node/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/hpg-node/tree/master
[daviddm-image]: http://img.shields.io/david/CaliStyle/hpg-node.svg?style=flat-square
[daviddm-url]: https://david-dm.org/CaliStyle/hpg-node
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/CaliStyle/hpg-node.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/CaliStyle/hpg-node/coverage
