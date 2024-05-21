"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGetSummaryEndpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const applyCustomDecorators_1 = require("../../../lib/applyCustomDecorators");
const ApiGetSummaryEndpoint = () => {
    return (0, applyCustomDecorators_1.applyCustomDecorators)([
        (0, swagger_1.ApiOperation)({
            summary: "Get summary of the system's data",
        }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'Return summary data including total users, active users, total projects, and total organizations and more',
        }),
        (0, swagger_1.ApiResponse)({
            status: 500,
            description: 'Internal Server Error - Failed to get summary data. Please try again later.',
        }),
    ]);
};
exports.ApiGetSummaryEndpoint = ApiGetSummaryEndpoint;
//# sourceMappingURL=stats-controllers.doc.js.map