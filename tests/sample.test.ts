import { ExpressionParser } from '../ExpressionParser';

describe('Basic tests', () => {
    describe('test the one function', () => {

        test('with space', async (done) => {
            var parser = new ExpressionParser();
            parser.SetParser('[space]');

            expect(parser.GetRegularExpression()).toBe('^\s');

            done();
        })

        test('with literals', async (done) => {
            var parser = new ExpressionParser();
            parser.SetParser('{Total}');

            expect(parser.GetRegularExpression()).toBe('^Total');

            done();
        });

        test('agroup various', async (done) => {
            var parser = new ExpressionParser();
            parser.SetParser('{Total} [space] [digit]');

            expect(parser.GetRegularExpression()).toBe('^Total\s\d');

            done();
        });

        test('with any', async (done) => {
            var parser = new ExpressionParser();
            parser.SetParser('{Total} [space] [digit] [any]');

            expect(parser.GetRegularExpression().toString()).toBe('^Total\s\d\.');

            done();
        });
    })
})