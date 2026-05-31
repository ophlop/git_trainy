const { test } = require('node:test');
const assert = require('assert');
const getRandom = require('../utils/getRandomQuestion');

test('returns isEnd when all questions answered', () => {
    const allIds = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24'
    const result = getRandom(allIds)
    assert.strictEqual(result.isEnd, true)
})

test('returns random quesion, when string with id empty', () => {
    const allIds = ''
    const result = getRandom(allIds)
    assert.strictEqual(!!result, true)
    assert.strictEqual(typeof result.id, 'number')
    assert.strictEqual(typeof result.question, 'string')
    assert.strictEqual(typeof result.answer, 'string')
})

test('return new question', () => {
    const ids = [1,2,3,4,5,6,7,8,9,10]
    const result = getRandom('1,2,3,4,5,6,7,8,9,10')
    assert.strictEqual(ids.includes(result.id), false)
})