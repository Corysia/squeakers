import { assert } from 'chai';
import { MathUtil } from '../src/MathUtil';


describe('test squeakers', function() {
    it('test squeakers.MathUtil.RandomRange', function(done) {
        let min = 1;
        let max = 10;
        let r = MathUtil.RandomRange(min, max);
        assert.isTrue(r >= min && r <= max);
        done();
    })
})

describe('test squeakers', function() {
    it('test squeakers.MathUtil.Shuffle', function(done) {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let shuffledArray = MathUtil.Shuffle(array);
        assert.notDeepEqual(array, shuffledArray);
        done();
    })
})