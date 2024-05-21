"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCustomDecorators = void 0;
const applyCustomDecorators = (decorators) => (target, key, descriptor) => {
    decorators.forEach((decorator) => decorator(target, key, descriptor));
};
exports.applyCustomDecorators = applyCustomDecorators;
//# sourceMappingURL=applyCustomDecorators.js.map