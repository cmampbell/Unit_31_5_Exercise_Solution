const {MarkovMachine} = require('./markov')

let mm;
describe('Testing MarkovMachine make chains method', function(){
    afterEach(function(){
        mm = undefined
    })

    test('makeChains returns an object with keys', function(){
        mm = new MarkovMachine('the cat in the hat is in the cat hat')

        expect(mm.chains).toEqual(expect.any(Object))
        expect(Object.keys(mm.chains).length).toBeGreaterThan(0)
    })
    test('Make chains returns an empty object if string is empty', function(){
        mm = new MarkovMachine('')

        expect(mm.chains).toEqual({})
    })
})

describe('Testing MarkovMachine makeText method', function(){
    test('makeText returns a string', function(){
        mm = new MarkovMachine('the cat in the hat is in the cat hat')

        expect(mm.makeText()).toEqual(expect.any(String))
        expect(mm.makeText().length).toBeGreaterThan(0)
    })
    test('makeText returns a string with a word count less than or equal to numWords', function(){
        mm = new MarkovMachine('the cat in the hat is in the cat hat')
        const result = mm.makeText(2)

        expect(result.split(' ').length).toBeLessThanOrEqual(2)
    })

    test('makeText returns an empty string if object parameter is empty', function(){
        mm = new MarkovMachine('')

        expect(mm.makeText()).toEqual('')
    })
})