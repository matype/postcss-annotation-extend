var parse = require('css-annotation').parse

module.exports = function plugin (css, options) {
    options = options || {}

    var annotations = parse(css)

    return function (root) {
        var matchedRules = []

        root.eachRule(function (node) {
            if (checkExtend(node)) {
                annotations.forEach(function (annotation) {
                    if (node.selector === annotation.rule) {
                        var res = {}
                        res.extend = node.selector
                        res.base = annotation.extend
                        matchedRules.push(res)
                    }
                })
            }
        })

        root.eachRule(function (node) {
            matchedRules.forEach(function (matchedRule) {
                if (node.selector === matchedRule.base) {
                    node.selector = matchedRule.extend
                }
            })
        })

        return root

    }
}

function checkBaseRule (node) {
    if (node.childs) {
        var children = node.childs
        var text = ''
        children.forEach(function (child) {
            if (child.type === 'comment') text = child.text
        })
        if (text.match(/\@base/)) return true
    }
    return false
}

function checkExtend (node) {
    if (node.childs) {
        var children = node.childs
        var text = ''
        children.forEach(function (child) {
            if (child.type === 'comment') text = child.text
        })
        if (text.match(/\@extend/)) return true
    }
    return false
}
