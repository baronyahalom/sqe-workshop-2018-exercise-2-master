import assert from 'assert';
import * as symbolic from '../src/js/symbolicSub';
import {parseCode} from '../src/js/code-analyzer';

describe('Tests for symbolic functions', () => {
    it(' 1. check if-else colors', () => {
        const input='function foo(x){\n' +
            '    if (x == 10) {\n' +
            '        return x;\n' +
            '    } else if (x > 12) {\n' +
            '        x = x - 1;\n' +
            '    } else {\n' +
            '        x = x * 3;\n' +
            '    }\n' +
            '    return x;\n' +
            '}';
        symbolic.parsInput('x=8')
        assert.equal(
            symbolic.symbolicSubstitution(input,parseCode(input)).length,
            10
        );
        assert.deepEqual(
            symbolic.getColorsMap(),
            [false,false,true]
        );
    });

    it('2. check while test', () => {
        const input='\n' +
            'function foo(x, y, z){\n' +
            '    while(x<2){\n' +
            '        let yahalom=\'yali\';\n' +
            '        if(yahalom== z[2]){\n' +
            '            return y + x * 2\n' +
            '        }else if(yahalom== \'yali\'){\n' +
            '            \n' +
            '        }else{\n' +
            '            return true;\n' +
            '        }\n' +
            '    }\n' +
            '    y = z + 1;\n' +
            '}';
        symbolic.parsInput('x=1,y=2,z=[0,2,\'ccc\']')
        assert.equal(
            symbolic.symbolicSubstitution(input,parseCode(input)).length,
            13
        );
        assert.deepEqual(
            symbolic.getColorsMap(),
            [false,true,false]
        );
    });

    it('3. check global', () => {
        const input='let w;\n' +
            'w=\'vvv\' \n' +
            'function foo(){\n' +
            ' let x=\'v\'+w;\n' +
            ' if(x==\'vvvv\'){\n' +
            '  return x;\n' +
            ' }\n' +
            '}';
        symbolic.parsInput('')
        assert.equal(symbolic.symbolicSubstitution(input,parseCode(input)).length,  6);
        assert.deepEqual(
            symbolic.getColorsMap(),
            [true]
        );
    });

    it('4. check with arr local', () => {
        const input='function foo(x)\n' +
             '{\n' +
             'let a=[1,3,\'\']\n' +
             'let b= a[1]-x;\n' +
             'if(b===1)\n' +
             'return b;\n' +
             '}';
        symbolic.parsInput('x=3');
        assert.equal(symbolic.symbolicSubstitution(input,parseCode(input)).length, 5);
        assert.deepEqual(
            symbolic.getColorsMap(),
            [false]
        );
    });

    it('5. check if the global changed', () => {
        const input='let w;\n' +
             'function foo(){\n' +
             'let y=w;\n' +
             'if(w==y){\n' +
             'return w;\n' +
             '}\n' +
             '}';
        symbolic.parsInput('w=1');
        assert.equal(symbolic.symbolicSubstitution(input,parseCode(input))[1],  'if(w==w){');
        assert.deepEqual(
            symbolic.getColorsMap(),
            [true]
        );
    });

    it('5. check func getExp', () => {
        const input='x=5';
        assert.equal(
            symbolic.getExp(input),
            'x'
        );
    });

    it('6. check func isToSave', () => {
        const input='return x;';
        assert.equal(
            symbolic.isToSave(input),
            true
        );
    });

    it('7. check funcColor', () => {
        const input='let x=5;\n' +
            'function foo(){\n' +
            'return x+1;\n' +
            '}';
        assert.deepEqual(
            symbolic.create(input),
            ['function foo(){','return x+1;','}']
        );
    });


    /* it('8. check with globals in input', () => {
         const input='let w;\n' +
             'let f;\n' +
             'function x(){\n' +
             'let y;\n' +
             'if(w==1){\n' +
             'return w;\n' +
             '}\n' +
             '}';
         symbolic.argsParser('w=10')
         assert.equal(symbolic.subtitution(input,parseCode(input)).length, 5);
         assert.deepEqual(
             symbolic.getColorsMap(),
             [false]
         );
     });


     it('9. check with global vars', () => {
         const input='let w=2;\n' +
             '\n' +
             '            function f(x){\n' +
             '                if (x > 2) {\n' +
             '                    x = 12;\n' +
             '                } else if (a == w) {\n' +
             '                    x = x - 1;\n' +
             '                } else {\n' +
             '                    x = x * 3;\n' +
             '            }\n' +
             '                return x;\n' +
             '            }\n' +
             'let a=12;\n' +
             '            w=w+10;';
         symbolic.argsParser('x=15')
         assert.equal(symbolic.subtitution(input,parseCode(input)).length,  12);
         assert.deepEqual(
             symbolic.getColorsMap(),
             [true,false,false]
         );
     });

     it(' 10. check colors - if with logic exp alt and input', () => {
         const input='function f(x){\n' +
             '    if (x > 2) {\n' +
             '        x = x + 1;\n' +
             '    } else if (x == 1 || x==-1) {\n' +
             '        x = x - 1;\n' +
             '    } else {\n' +
             '        x = x * 3;\n' +
             '    }\n' +
             '    return x;\n' +
             '}';
         symbolic.argsParser('x=-1')
         assert.equal(
             symbolic.subtitution(input,parseCode(input)).length,
             10
         );
         assert.deepEqual(
             symbolic.getColorsMap(),
             [false,true,false]
         );
     });
     */
});



