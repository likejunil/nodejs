const {lazy} = require('./lazy.js');

describe('async', () => {
    it('async - then', () => {
        return lazy('red').then(res =>
            expect(res).toEqual({name: 'red'}));
    })
    
    it('async - await', async () => {
        const ret = await lazy('blue');
        expect(ret).toEqual({name: 'blue'});
    })
    
    it('async - resolves', () => {
        expect(lazy('yellow'))
            .resolves
            .toEqual({name: 'yellow'});
    });
    
    it('async - rejects', () => {
        expect(lazy('black'))
            .rejects
            .toEqual('보이지 않는 색');
    });
    
});
