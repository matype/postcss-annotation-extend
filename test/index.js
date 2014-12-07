var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')
var extend = require('..')

function fixture (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

function output (name) {
    return fs.readFileSync('test/fixtures/' + name + '.out.css', 'utf-8').trim()
}

test('test-1', function (t) {
    var res = postcss().use(extend(fixture('test-1'))).process(fixture('test-1')).css.trim()
    t.same(res, output('test-1'))
    t.end()
})

test('test-2', function (t) {
    var res = postcss().use(extend(fixture('test-2'))).process(fixture('test-2')).css.trim()
    t.same(res, output('test-2'))
    t.end()
})

test('test-3', function (t) {
    var res = postcss().use(extend(fixture('test-3'))).process(fixture('test-3')).css.trim()
    t.same(res, output('test-3'))
    t.end()
})

test('test-4', function (t) {
    var res = postcss().use(extend(fixture('test-4'))).process(fixture('test-4')).css.trim()
    t.same(res, output('test-4'))
    t.end()
})
