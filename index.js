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

        var newMatched = []
        matchedRules.forEach(function (matchedRule, i) {
            var deleteFlag = false
            var sels = []
            for (var j = i + 1; j < matchedRules.length; j++) {
                var count = false;
                if (matchedRule.base === matchedRules[j].base) {
                    if (!count) sels.push(matchedRule.extend)
                    sels.push(matchedRules[j].extend)
                    count = true
                    deleteFlag = true
                }
            }
            if (deleteFlag) {
                for (var k = 0; k < matchedRules.length; k++) {
                    if (matchedRules[k].base === matchedRule.base) {
                        matchedRules.splice(k, 1)
                    }
                }
                var newSelector = sels.join(',\n')
                newMatched.push({
                    extend: newSelector,
                    base: matchedRule.base
                })
            } else {
                newMatched.push({
                    extend: matchedRule.extend,
                    base: matchedRule.base
                })
            }
        })
        matchedRules = newMatched

        root.eachRule(function (node) {
            matchedRules.forEach(function (matchedRule) {
                if (Array.isArray(matchedRule.base)) {
                    matchedRule.base.forEach(function (base) {
                        if (node.selector === base) {
                            node.selector = matchedRule.extend
                        }
                    })
                } else {
                    if (node.selector === matchedRule.base) {
                        node.selector = matchedRule.extend
                    }
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
