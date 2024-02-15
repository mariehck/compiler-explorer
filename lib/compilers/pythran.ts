import {BaseCompiler} from '../base-compiler.js';
import type {PreliminaryCompilerInfo} from '../../types/compiler.interfaces.js';
import type {ParseFiltersAndOutputOptions} from '../../types/features/filters.interfaces.js';

export class PythranCompiler extends BaseCompiler {
    static get key() {
        return 'pythran';
    }

    constructor(info: PreliminaryCompilerInfo, env) {
        super(info, env);
    }

    override optionsForFilter(
        filters: ParseFiltersAndOutputOptions,
        outputFilename: string,
        userOptions?: string[],
    ): string[] {
        let options = ['-o', this.filename(outputFilename)];
        if (!filters.binary && !filters.binaryObject) options = options.concat('-E');
        return options;
    }

    override getCompilerResultLanguageId(filters?: ParseFiltersAndOutputOptions): string | undefined {
        logger.error(`getCompilerRLId with ${filters}`);
        if (typeof(filters) !== 'undefined' && filters.binary) {
            logger.error(`============= Setting to ASM`);
            return 'asm';
        } else {
            logger.error(`============= Setting to C++`);
            return 'cppp';
        }
    }
}
