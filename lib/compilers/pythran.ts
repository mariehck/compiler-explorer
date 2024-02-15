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

    override getCompilerResultLanguageId() {
        return 'cppp';
    }
}
