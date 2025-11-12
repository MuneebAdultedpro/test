'use strict';
var _a, _b, _c;
Object.defineProperty(exports, '__esModule', { value: true });
exports.stopWatchingAlgoliaSync =
    exports.syncWithAlgolia =
    exports.importAllJobsToAlgolia =
        void 0;
const algoliasearch_1 = require('algoliasearch');
const models_1 = require('../mvc/models');
const algoliaClient = (0, algoliasearch_1.algoliasearch)(
    (_a = process === null || process === void 0 ? void 0 : process.env) ===
        null || _a === void 0
        ? void 0
        : _a.ALGOLIA_MONGO_APP_ID,
    (_b = process === null || process === void 0 ? void 0 : process.env) ===
        null || _b === void 0
        ? void 0
        : _b.ALGOLIA_MONGO_APP_KEY
);
const adevAlgoliaIndex =
    (_c = process === null || process === void 0 ? void 0 : process.env) ===
        null || _c === void 0
        ? void 0
        : _c.ALGOLIA_MONGO_INDEX;
const importAllJobsToAlgolia = async () => {
    var _a;
    try {
        // Fetch all jobs from MongoDB
        const jobs = await models_1.Job.find();
        if ((jobs === null || jobs === void 0 ? void 0 : jobs.length) === 0) {
            return;
        }
        // Prepare data for Algolia (ensure each document has an `objectID` field)
        // For Prod
        // const jobsToAlgolia = jobs?.map?.(({ _doc }) => ({
        //     objectID: _doc?._id?.toString?.(), // Algolia requires a unique objectID
        //     ..._doc,
        //     job_description: _doc?.job_description,
        //     contact_bio: _doc?.contact_bio,
        //     branch_bio: _doc?.branch_bio,
        //     title: _doc?.title,
        //     program: _doc?.program,
        // }));
        // // Bulk save to Algolia
        // await devAlgoliaClient.saveObjects({
        //     indexName: prodAlgoliaIndex,
        //     objects: jobsToAlgolia,
        // });
        // For Dev
        const jobsToAlgolia =
            (_a = jobs === null || jobs === void 0 ? void 0 : jobs.map) ===
                null || _a === void 0
                ? void 0
                : _a.call(jobs, ({ _doc }) => {
                      var _a,
                          _b,
                          _c,
                          _d,
                          _e,
                          _f,
                          _g,
                          _h,
                          _j,
                          _k,
                          _l,
                          _m,
                          _o,
                          _p,
                          _q,
                          _r,
                          _s,
                          _t,
                          _u,
                          _v,
                          _w,
                          _x,
                          _y,
                          _z,
                          _0,
                          _1,
                          _2,
                          _3,
                          _4,
                          _5;
                      return Object.assign(
                          Object.assign(
                              {
                                  objectID:
                                      (_b =
                                          (_a =
                                              _doc === null || _doc === void 0
                                                  ? void 0
                                                  : _doc._id) === null ||
                                          _a === void 0
                                              ? void 0
                                              : _a.toString) === null ||
                                      _b === void 0
                                          ? void 0
                                          : _b.call(_a),
                              },
                              _doc
                          ),
                          {
                              job_description:
                                  typeof (_doc === null || _doc === void 0
                                      ? void 0
                                      : _doc.job_description) === 'string'
                                      ? (_c =
                                            _doc === null || _doc === void 0
                                                ? void 0
                                                : _doc.job_description) ===
                                            null || _c === void 0
                                          ? void 0
                                          : _c.substring(1, 40)
                                      : {
                                            en:
                                                (_e =
                                                    (_d =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.job_description) ===
                                                        null || _d === void 0
                                                        ? void 0
                                                        : _d.en) === null ||
                                                _e === void 0
                                                    ? void 0
                                                    : _e.substring(1, 40),
                                            es:
                                                (_g =
                                                    (_f =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.job_description) ===
                                                        null || _f === void 0
                                                        ? void 0
                                                        : _f.es) === null ||
                                                _g === void 0
                                                    ? void 0
                                                    : _g.substring(1, 40),
                                            tl:
                                                (_j =
                                                    (_h =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.job_description) ===
                                                        null || _h === void 0
                                                        ? void 0
                                                        : _h.tl) === null ||
                                                _j === void 0
                                                    ? void 0
                                                    : _j.substring(1, 40),
                                        },
                              contact_bio:
                                  typeof (_doc === null || _doc === void 0
                                      ? void 0
                                      : _doc.contact_bio) === 'string'
                                      ? (_k =
                                            _doc === null || _doc === void 0
                                                ? void 0
                                                : _doc.contact_bio) === null ||
                                        _k === void 0
                                          ? void 0
                                          : _k.substring(1, 40)
                                      : {
                                            en:
                                                (_m =
                                                    (_l =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.contact_bio) ===
                                                        null || _l === void 0
                                                        ? void 0
                                                        : _l.en) === null ||
                                                _m === void 0
                                                    ? void 0
                                                    : _m.substring(1, 40),
                                            es:
                                                (_p =
                                                    (_o =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.contact_bio) ===
                                                        null || _o === void 0
                                                        ? void 0
                                                        : _o.es) === null ||
                                                _p === void 0
                                                    ? void 0
                                                    : _p.substring(1, 40),
                                            tl:
                                                (_r =
                                                    (_q =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.contact_bio) ===
                                                        null || _q === void 0
                                                        ? void 0
                                                        : _q.tl) === null ||
                                                _r === void 0
                                                    ? void 0
                                                    : _r.substring(1, 40),
                                        },
                              branch_bio:
                                  typeof (_doc === null || _doc === void 0
                                      ? void 0
                                      : _doc.branch_bio) === 'string'
                                      ? (_s =
                                            _doc === null || _doc === void 0
                                                ? void 0
                                                : _doc.branch_bio) === null ||
                                        _s === void 0
                                          ? void 0
                                          : _s.substring(1, 40)
                                      : {
                                            en:
                                                (_u =
                                                    (_t =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.branch_bio) ===
                                                        null || _t === void 0
                                                        ? void 0
                                                        : _t.en) === null ||
                                                _u === void 0
                                                    ? void 0
                                                    : _u.substring(1, 40),
                                            es:
                                                (_w =
                                                    (_v =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.branch_bio) ===
                                                        null || _v === void 0
                                                        ? void 0
                                                        : _v.es) === null ||
                                                _w === void 0
                                                    ? void 0
                                                    : _w.substring(1, 40),
                                            tl:
                                                (_y =
                                                    (_x =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.branch_bio) ===
                                                        null || _x === void 0
                                                        ? void 0
                                                        : _x.tl) === null ||
                                                _y === void 0
                                                    ? void 0
                                                    : _y.substring(1, 40),
                                        },
                              title:
                                  typeof (_doc === null || _doc === void 0
                                      ? void 0
                                      : _doc.title) === 'string'
                                      ? (_z =
                                            _doc === null || _doc === void 0
                                                ? void 0
                                                : _doc.title) === null ||
                                        _z === void 0
                                          ? void 0
                                          : _z.substring(1, 40)
                                      : {
                                            en:
                                                (_1 =
                                                    (_0 =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.title) ===
                                                        null || _0 === void 0
                                                        ? void 0
                                                        : _0.en) === null ||
                                                _1 === void 0
                                                    ? void 0
                                                    : _1.substring(1, 40),
                                            es:
                                                (_3 =
                                                    (_2 =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.title) ===
                                                        null || _2 === void 0
                                                        ? void 0
                                                        : _2.es) === null ||
                                                _3 === void 0
                                                    ? void 0
                                                    : _3.substring(1, 40),
                                            tl:
                                                (_5 =
                                                    (_4 =
                                                        _doc === null ||
                                                        _doc === void 0
                                                            ? void 0
                                                            : _doc.title) ===
                                                        null || _4 === void 0
                                                        ? void 0
                                                        : _4.tl) === null ||
                                                _5 === void 0
                                                    ? void 0
                                                    : _5.substring(1, 40),
                                        },
                              program:
                                  _doc === null || _doc === void 0
                                      ? void 0
                                      : _doc.program,
                          }
                      );
                  });
        await algoliaClient.saveObjects({
            indexName: adevAlgoliaIndex,
            objects: jobsToAlgolia,
        });
        console.log(`${jobs.length} jobs have been imported into Algolia.`);
    } catch (err) {
        console.log('Error importing jobs to Algolia:', err);
    }
};
exports.importAllJobsToAlgolia = importAllJobsToAlgolia;
let changeStream;
const syncWithAlgolia = async () => {
    var _a;
    if (!changeStream) {
        // Watch for changes in the "jobs" collection
        changeStream =
            (_a =
                models_1.Job === null || models_1.Job === void 0
                    ? void 0
                    : models_1.Job.watch) === null || _a === void 0
                ? void 0
                : _a.call(models_1.Job);
        changeStream.on('change', async (change) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            try {
                switch (change.operationType) {
                    case 'insert':
                        // Add new job to Algolia
                        const newJob =
                            change === null || change === void 0
                                ? void 0
                                : change.fullDocument;
                        newJob.objectID =
                            newJob === null || newJob === void 0
                                ? void 0
                                : newJob._id; // Set Algolia objectID
                        await ((_a =
                            algoliaClient === null || algoliaClient === void 0
                                ? void 0
                                : algoliaClient.saveObjects) === null ||
                        _a === void 0
                            ? void 0
                            : _a.call(algoliaClient, {
                                  indexName: adevAlgoliaIndex,
                                  objects: [newJob],
                              }));
                        break;
                    case 'update':
                        // Fetch the updated document and sync with Algolia
                        const updatedJob = await models_1.Job.findById(
                            (_b =
                                change === null || change === void 0
                                    ? void 0
                                    : change.documentKey) === null ||
                                _b === void 0
                                ? void 0
                                : _b._id
                        );
                        if (updatedJob) {
                            const jobForAlgolia =
                                (_c =
                                    updatedJob === null || updatedJob === void 0
                                        ? void 0
                                        : updatedJob.toObject) === null ||
                                _c === void 0
                                    ? void 0
                                    : _c.call(updatedJob);
                            jobForAlgolia.objectID =
                                jobForAlgolia === null ||
                                jobForAlgolia === void 0
                                    ? void 0
                                    : jobForAlgolia._id; // Set Algolia objectID
                            await ((_d =
                                algoliaClient === null ||
                                algoliaClient === void 0
                                    ? void 0
                                    : algoliaClient.saveObjects) === null ||
                            _d === void 0
                                ? void 0
                                : _d.call(algoliaClient, {
                                      indexName: adevAlgoliaIndex,
                                      objects: [jobForAlgolia],
                                  }));
                        }
                        break;
                    case 'delete':
                        // Remove job from Algolia
                        await ((_e =
                            algoliaClient === null || algoliaClient === void 0
                                ? void 0
                                : algoliaClient.deleteObjects) === null ||
                        _e === void 0
                            ? void 0
                            : _e.call(algoliaClient, {
                                  indexName: adevAlgoliaIndex,
                                  objectIDs: [
                                      (_h =
                                          (_g =
                                              (_f =
                                                  change === null ||
                                                  change === void 0
                                                      ? void 0
                                                      : change.documentKey) ===
                                                  null || _f === void 0
                                                  ? void 0
                                                  : _f._id) === null ||
                                          _g === void 0
                                              ? void 0
                                              : _g.toString) === null ||
                                      _h === void 0
                                          ? void 0
                                          : _h.call(_g),
                                  ],
                              }));
                        break;
                    default:
                        console.log(
                            'Unhandled change type:',
                            change === null || change === void 0
                                ? void 0
                                : change.operationType
                        );
                }
            } catch (error) {
                console.log(
                    'Got an error while updating the algolia search in syncWithAlgolia function'
                );
            }
        });
        changeStream.on('error', (error) => {
            console.log('ChangeStream error:', error);
        });
        changeStream.on('close', () => {
            console.log('ChangeStream closed.');
            changeStream = null;
        });
        console.log('Watching for changes in the jobs collection...');
    }
};
exports.syncWithAlgolia = syncWithAlgolia;
// Stop watching the changeStream
const stopWatchingAlgoliaSync = async () => {
    var _a;
    if (changeStream) {
        try {
            console.log('Closing changeStream for Algolia sync...');
            await ((_a =
                changeStream === null || changeStream === void 0
                    ? void 0
                    : changeStream.close) === null || _a === void 0
                ? void 0
                : _a.call(changeStream));
            console.log('ChangeStream for Algolia sync closed.');
        } catch (error) {
            console.log('Error closing changeStream:', error);
        } finally {
            changeStream = null;
        }
    }
};
exports.stopWatchingAlgoliaSync = stopWatchingAlgoliaSync;
//# sourceMappingURL=algolia-search.methods.js.map
