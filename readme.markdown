# postcss-annotation-extend [![Build Status](https://travis-ci.org/morishitter/postcss-annotation-extend.svg)](https://travis-ci.org/morishitter/postcss-annotation-extend)

PostCSS plugin for annotations based inheritance from other rule sets

## Installation

```shell
$ npm install postcss-annotation-extend
```

## Example

```js
// Dependencies
var fs = require("fs")
var postcss = require("postcss")
var extend = require("postcss-annotation-extend")

// CSS to be processed
var css = fs.readFileSync("input.css", "utf8")

// Process css
var output = postcss()
  .use(extend({src: css}))
  .process(css)
  .css
```

Using this `input.css`:

```css
.base-1 {
  /*
   * @base
   */
  font-size: 12px;
}

.base-2 {
  /*
   * @base
   */
  color: red;
}

.foo {
  /*
   * @extend .base-1, .base-2
   */
   padding: 10px;
}

.bar {
  /*
   * @extend .base-1
   */
   margin: 10px;
}
```

You will get:

```css
.foo,
.bar {
  /*
   * @base
   */
  font-size: 12px;
}

.foo {
  /*
   * @base
   */
  color: red;
}

.foo {
  /*
   * @extend .base-1, .base-2
   */
   padding: 10px;
}

.bar {
  /*
   * @extend .base-1
   */
   margin: 10px;
}
```

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
