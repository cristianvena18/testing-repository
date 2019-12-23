export class ExpressionParser {

    private RegularExpression: RegExp;
    private stringRegExpect: string;

    constructor() {

    }

    public SetParser(regExp: string): void {
        var salida: string;

        salida = '^';

        var vs: string[] = regExp.split(' ');

        //console.log(vs);

        for (let index = 0; index < vs.length; index++) {

            if (vs[index] === "[space]") {
                salida += '\s';
            }
            else if (vs[index] === "[any]") {
                salida += '\.';
            }
            else if (vs[index][0] === "{") {
                var one: string = '';
                for (let i = 0; i < vs[index].length; i++) {

                    if (vs[index][i] !== '}' && vs[index][i] !== '{') {
                        one += vs[index][i];
                    }
                }
                salida += one;
            }
            else if (vs[index] === "[digit]") {
                salida += '\d';
            }
            else if (vs[index] === "[[digit]]") {
                salida += '(\d+)';
            }
            else if (vs[index] === "[money]") {
                salida += '(\$|USD)';
            }
            else if (vs[index] === "?[money]") {
                salida += '(?:(\$|USD))';
            }
            else {
                throw new Error('no match found with ' + vs[index]);
            }
        }

        salida = salida.replace(' ', '');
        this.stringRegExpect = salida;
        this.RegularExpression = new RegExp(salida, 'i');

    }

    public Match(phrase: string): RegExpExecArray {
        return this.RegularExpression.exec(phrase);
    }

    public GetRegularExpression(): string {
        return this.stringRegExpect;
    }
}