import { ExpressionParser } from "../ExpressionParser"

describe('with to do',() => {
    test('to do', async (done) => {

        const parser = new ExpressionParser();
        parser.SetParser("[any] [[digit]] ?[money] [[digit]] [money]");

        expect(parser.GetRegularExpression()).toBe('^\.(\d+)(?:(\$|USD))(\d+)(\$|USD)');
        done();
    })
})