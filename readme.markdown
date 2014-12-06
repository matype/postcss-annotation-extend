# postcss-extend [![Build Status](https://travis-ci.org/morishitter/postcss-extend.svg)](https://travis-ci.org/morishitter/postcss-extend)

PostCSS plugin for the annotation based inheritance of other rule set

## Installation

```shell
$ npm install postcss-extend
```

## Example

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var extend = require("postcss-extend")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(constant(css))
  .process(css)
  .css
```

Using thi `input.css`:

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
```

You will get:

```css
.foo {
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
```

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
