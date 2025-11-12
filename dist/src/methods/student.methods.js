'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.formatSchoolName = void 0;
const formatSchoolName = (schoolName) => {
    return schoolName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
};
exports.formatSchoolName = formatSchoolName;
//# sourceMappingURL=student.methods.js.map
