'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.scheduleBulkUploadJobsCron = exports.removeUndefinedFields = void 0;
const apify_client_1 = require('apify-client');
const uuid_1 = require('uuid');
const methods_1 = require('../../methods');
const cron = require('node-cron');
const listOfJobPostionsToScrapJobsFor = [
    {
        title: 'CNA',
        url: 'https://www.indeed.com/jobs?q=CNA&l=Monrovia%2C+CA&radius=50&vjk=834e2f5ffe488f20',
        program: ['Healthcare'],
    },
    {
        title: 'Caregiver',
        url: 'https://www.indeed.com/jobs?q=caregiver&l=Monrovia%2C+CA&radius=50&vjk=2a158ac56052e417',
        program: ['Healthcare'],
    },
    {
        title: 'Medical Assistant',
        url: 'https://www.indeed.com/jobs?q=Medical+Assistant&l=Monrovia%2C+CA&radius=50&vjk=c0b0971b36bf5ec3',
        program: ['Healthcare'],
    },
    {
        title: 'Pharmacy Technician',
        url: 'https://www.indeed.com/jobs?q=Pharmacy+Technician&l=Claremont%2C+CA&radius=50&vjk=56c854dfa300ee40',
        program: ['Pharmacy Technician'],
    },
    {
        title: 'Security Guard',
        url: 'https://www.indeed.com/jobs?q=Security+Guard&l=Monrovia%2C+CA&radius=50&vjk=b82307b5ef5ba8a3',
        program: ['Other'],
    },
    {
        title: 'Construction',
        url: 'https://www.indeed.com/jobs?q=Construction&l=Monrovia%2C+CA&sc=0kf%3Aattr%28D7S5D%29%3B&radius=50&vjk=2b55181742edd532',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Kitchen Staff',
        url: 'https://www.indeed.com/jobs?q=kitchen+staff&l=Claremont%2C+CA&radius=50&start=10&vjk=e2353405c25b930f',
        program: ['Other'],
    },
    {
        title: 'Cleaning',
        url: 'https://www.indeed.com/jobs?q=Cleaning&l=Claremont%2C+CA&from=searchOnDesktopSerp&vjk=2a13c676b3088211',
        program: ['Other'],
    },
    {
        title: 'Housekeeping',
        url: 'https://www.indeed.com/jobs?q=housekeeping&l=Claremont%2C+CA&from=searchOnDesktopSerp&vjk=25d799da0a90f9f6',
        program: ['Other'],
    },
    {
        title: 'Factory Worker',
        url: 'https://www.indeed.com/jobs?q=factory&l=Claremont%2C+CA&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B&vjk=8da609889a041824',
        program: ['Other'],
    },
    {
        title: 'Warehouse',
        url: 'https://www.indeed.com/jobs?q=warehouse&l=Claremont%2C+CA&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B&vjk=14fa5a1eef90036e',
        program: ['Other'],
    },
    {
        title: 'Landscaping',
        url: 'https://www.indeed.com/jobs?q=landscaping&l=Monrovia%2C+CA&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B&radius=35&vjk=1f21e3e1588afea6',
        program: ['Other'],
    },
    {
        title: 'Driver',
        url: 'https://www.indeed.com/jobs?q=driver&l=Monrovia%2C+CA&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B&vjk=47eda2d4447e0d9b',
        program: ['Other'],
    },
    {
        title: 'Tailor/Seamstress',
        url: 'https://www.indeed.com/jobs?q=seamstress+tailor&l=Monrovia%2C+CA&radius=35&vjk=bb5a999f869b6710',
        program: ['Other'],
    },
    {
        title: 'Medicare Peer Support Telecare',
        url: 'https://www.indeed.com/jobs?q=telecare+corp+peer+support&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=c9e58d63a44026b8',
        program: ['Healthcare'],
    },
    {
        title: 'Sycamores',
        url: 'https://www.indeed.com/jobs?q=sycamores+peer+support&l=Monrovia%2C+CA&radius=50&vjk=a4bea609ad94858f',
        program: ['Healthcare'],
    },
    {
        title: 'LA CADA',
        url: 'https://www.indeed.com/cmp/La-Cada-1/jobs?clearPrefilter=1',
        program: ['Healthcare'],
    },
    {
        title: 'PennyLane',
        url: 'https://www.indeed.com/jobs?q=pennylane&l=Monrovia%2C+CA&sc=0kf%3Aexplvl%28ENTRY_LEVEL%29%3B&radius=50&vjk=b4697c00d9fc2bb2',
        program: ['Healthcare'],
    },
    {
        title: 'NamiGLAC',
        url: 'https://www.indeed.com/jobs?q=NAMI&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=ba64287bc012b7cb',
        program: ['Healthcare'],
    },
    {
        title: 'ENKI Health',
        url: 'https://www.indeed.com/jobs?q=ENKI&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=feffa69d4b23d26a',
        program: ['Healthcare'],
    },
    {
        title: 'Construction Assistant',
        url: 'https://www.indeed.com/q-Construction-Assistant-l-Monrovia,-CA-jobs.html',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Equipment Operator',
        url: 'https://www.indeed.com/jobs?q=Equipment+Operator&l=Monrovia%2C+CA&vjk=4b65492e69a1128b',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Inspector',
        url: 'https://www.indeed.com/jobs?q=Inspector&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=952ac8b79b4da67d',
        program: ['Construction/Automotive'],
    },
    {
        title: 'General Laborer',
        url: 'https://www.indeed.com/jobs?q=General+Laborer&l=Monrovia%2C+CA&radius=25&vjk=8f66a16e6e1013cd',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Construction Foreperson',
        url: 'https://www.indeed.com/jobs?q=Construction+Foreperson&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=43dc5a74f41795c2',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Scheduler',
        url: 'https://www.indeed.com/jobs?q=Scheduler&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=ca8b75494e655f1b',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Field Engineer',
        url: 'https://www.indeed.com/jobs?q=Field+Engineer&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=ca5cbd0a0c4c67b0',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Estimator',
        url: 'https://www.indeed.com/jobs?q=Estimator&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=c2f469481dbf19fe',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Surveyor',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Surveyor&l=Monrovia%2C+CA&radius=50&vjk=9c39e503202b922a',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Building Services Director',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Building+Services+Director&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=6d36354dcb9807c9',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Assistant Project Manager',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Assistant+Project+Manager&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=f6679e99faf21593',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Senior Construction Manager',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Senior+Construction+Manager&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=518bcb69a5cb0739',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Civil Engineer',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Civil+Engineer&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=f7b03250ebfaffa2',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Project Manager',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Project+Manager&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=8047f55bc3dea767',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Safety Manager',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Safety+Manager&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=6c37e882d9afb30a',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Painter',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Painter&l=Monrovia%2C+CA&from=searchOnDesktopSerp&vjk=c14f8545d6302139',
        program: ['Construction/Automotive'],
    },
    {
        title: 'Roofer',
        url: 'https://www.indeed.com/jobs?q=Construction+Jobs+Roofer&l=Monrovia%2C+CA&radius=50&vjk=940f5b21c2d14f16',
        program: ['Construction/Automotive'],
    },
];
// Function to select a random job position
// const selectRandomJobPosition = () => {
//     const randomIndex = Math.floor(
//         Math.random() * listOfJobPostionsToScrapJobsFor?.length
//     );
//     const randomJobPosition = listOfJobPostionsToScrapJobsFor?.[randomIndex];
//     console.log(`Selected Job Position: ${randomJobPosition}`);
//     // You can perform any additional operations with the selected job position here
// };
const removeUndefinedFields = (obj) => {
    const newObj = {};
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (
            obj.hasOwnProperty(key) &&
            (obj === null || obj === void 0 ? void 0 : obj[key]) !== undefined
        ) {
            newObj[key] = obj === null || obj === void 0 ? void 0 : obj[key];
        }
    }
    return newObj;
};
exports.removeUndefinedFields = removeUndefinedFields;
const employerJobCounts = [];
const fetchEmployerByCompanyAndBranch = async ({
    companyName,
    branchLocation,
}) => {
    try {
        const employerQuerySnapshot = await methods_1.firebaseDB
            .collection('employers')
            .where('name', '==', companyName)
            .where('branchLocation', '==', branchLocation)
            .get();
        const employers = employerQuerySnapshot.docs.map((doc) => {
            var _a;
            return (_a = doc === null || doc === void 0 ? void 0 : doc.data) ===
                null || _a === void 0
                ? void 0
                : _a.call(doc);
        });
        employers.sort(
            (a, b) =>
                (a === null || a === void 0 ? void 0 : a.dateCreated) -
                (b === null || b === void 0 ? void 0 : b.dateCreated)
        );
        return employers === null || employers === void 0
            ? void 0
            : employers[0];
    } catch (error) {
        console.log(
            'fetchEmployerByCompanyAndBranch in bulk upload failed with',
            error
        );
    }
};
const fetchJobsByEmployerEmail = async (email) => {
    var _a, _b;
    try {
        const employerQuerySnapshot = await methods_1.firebaseDB
            .collection('jobs')
            .where('employerEmail', '==', email)
            .get();
        const jobs =
            (_b =
                (_a =
                    employerQuerySnapshot === null ||
                    employerQuerySnapshot === void 0
                        ? void 0
                        : employerQuerySnapshot.docs) === null || _a === void 0
                    ? void 0
                    : _a.map) === null || _b === void 0
                ? void 0
                : _b.call(_a, (doc) => {
                      var _a;
                      return (_a =
                          doc === null || doc === void 0
                              ? void 0
                              : doc.data) === null || _a === void 0
                          ? void 0
                          : _a.call(doc);
                  });
        return jobs;
    } catch (error) {
        console.log(
            'fetchJobsByEmployerEmail in bulk upload failed with',
            error
        );
    }
};
const setJobApi = async (jobdata) => {
    try {
        jobdata = (0, exports.removeUndefinedFields)(jobdata);
        if (!jobdata.id) {
            jobdata.id = (0, uuid_1.v4)();
            jobdata.dateCreated = new Date();
        }
        jobdata.dateUpdated = new Date();
        jobdata.isTest = false;
        await methods_1.firebaseDB
            .collection('jobs')
            .doc(jobdata === null || jobdata === void 0 ? void 0 : jobdata.id)
            .set(jobdata, { merge: true });
        return jobdata;
    } catch (error) {
        console.log('setJobApi in bulk upload failed with', error);
    }
};
const getJobCountByEmail = (email) => {
    var _a;
    const emp =
        (_a =
            employerJobCounts === null || employerJobCounts === void 0
                ? void 0
                : employerJobCounts.find) === null || _a === void 0
            ? void 0
            : _a.call(
                  employerJobCounts,
                  (item) =>
                      (item === null || item === void 0
                          ? void 0
                          : item.email) === email
              );
    return emp ? (emp === null || emp === void 0 ? void 0 : emp.jobCount) : 0;
};
const fetchEmployerMainBranch = async ({ companyName }) => {
    var _a, _b;
    try {
        const employerQuerySnapshot = await methods_1.firebaseDB
            .collection('employers')
            .where('name', '==', companyName)
            .where('isHeadquarter', '==', true)
            .get();
        const employers =
            (_b =
                (_a =
                    employerQuerySnapshot === null ||
                    employerQuerySnapshot === void 0
                        ? void 0
                        : employerQuerySnapshot.docs) === null || _a === void 0
                    ? void 0
                    : _a.map) === null || _b === void 0
                ? void 0
                : _b.call(_a, (doc) => {
                      var _a;
                      return (_a =
                          doc === null || doc === void 0
                              ? void 0
                              : doc.data) === null || _a === void 0
                          ? void 0
                          : _a.call(doc);
                  });
        employers.sort(
            (a, b) =>
                (a === null || a === void 0 ? void 0 : a.dateCreated) -
                (b === null || b === void 0 ? void 0 : b.dateCreated)
        );
        // to make sure we always have some photo
        const filteredByPhotoUrl =
            employers === null || employers === void 0
                ? void 0
                : employers.find(
                      (item) =>
                          (item === null || item === void 0
                              ? void 0
                              : item.photoUrl) !== ''
                  );
        return filteredByPhotoUrl
            ? filteredByPhotoUrl
            : employers === null || employers === void 0
            ? void 0
            : employers[0];
    } catch (error) {
        console.log(
            'fetchEmployerMainBranch in bulk upload failed with ',
            error
        );
    }
};
const createEmployer = async (employerData) => {
    try {
        employerData =
            exports.removeUndefinedFields === null ||
            exports.removeUndefinedFields === void 0
                ? void 0
                : (0, exports.removeUndefinedFields)(employerData);
        const id = (0, uuid_1.v4)();
        const data = Object.assign(Object.assign({}, employerData), {
            dateCreated: new Date(),
            dateUpdated: new Date(),
            id,
            isTest: false,
        });
        await methods_1.firebaseDB
            .collection('employers')
            .doc(data === null || data === void 0 ? void 0 : data.id)
            .set(data, { merge: true });
        return data;
    } catch (error) {
        console.error(
            'error',
            error,
            error === null || error === void 0 ? void 0 : error.name,
            error === null || error === void 0 ? void 0 : error.code
        );
    }
};
const updateEmployerJobCount = async (row, employer) => {
    var _a, _b, _c, _d;
    try {
        const emailToCheck =
            (_c =
                (_b =
                    (_a =
                        employer === null || employer === void 0
                            ? void 0
                            : employer.email) !== null && _a !== void 0
                        ? _a
                        : row === null || row === void 0
                        ? void 0
                        : row.email) !== null && _b !== void 0
                    ? _b
                    : row === null || row === void 0
                    ? void 0
                    : row.Email) !== null && _c !== void 0
                ? _c
                : (_d =
                      process === null || process === void 0
                          ? void 0
                          : process.env) === null || _d === void 0
                ? void 0
                : _d.ADMIN_EMAIL;
        const existingEmployerIndex = employerJobCounts.findIndex(
            () => emailToCheck
        );
        if (existingEmployerIndex !== -1) {
            //employer exists
            employerJobCounts[existingEmployerIndex].jobCount++;
        } else {
            // If employer doesn't exist, add it to the array
            const employerJobs = await fetchJobsByEmployerEmail(emailToCheck);
            employerJobCounts.push({
                email: emailToCheck,
                jobCount:
                    employerJobs === null || employerJobs === void 0
                        ? void 0
                        : employerJobs.length,
            });
        }
    } catch (error) {
        console.log('updateEmployerJobCount in bulk upload failed with', error);
    }
};
const parseData = async (items, selectedLinkJobData) => {
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
        _5,
        _6,
        _7,
        _8,
        _9,
        _10,
        _11,
        _12,
        _13,
        _14,
        _15,
        _16,
        _17,
        _18,
        _19,
        _20,
        _21,
        _22,
        _23,
        _24,
        _25,
        _26,
        _27,
        _28,
        _29,
        _30,
        _31,
        _32,
        _33,
        _34,
        _35,
        _36,
        _37,
        _38,
        _39,
        _40,
        _41,
        _42,
        _43,
        _44,
        _45,
        _46,
        _47,
        _48,
        _49,
        _50,
        _51,
        _52,
        _53,
        _54,
        _55,
        _56,
        _57,
        _58,
        _59,
        _60,
        _61,
        _62,
        _63,
        _64,
        _65,
        _66,
        _67,
        _68,
        _69,
        _70,
        _71,
        _72,
        _73,
        _74,
        _75,
        _76,
        _77,
        _78,
        _79,
        _80,
        _81,
        _82,
        _83,
        _84,
        _85,
        _86,
        _87,
        _88,
        _89,
        _90,
        _91,
        _92,
        _93,
        _94,
        _95,
        _96,
        _97,
        _98,
        _99,
        _100,
        _101,
        _102,
        _103,
        _104,
        _105,
        _106,
        _107,
        _108,
        _109,
        _110,
        _111,
        _112,
        _113,
        _114,
        _115,
        _116,
        _117,
        _118,
        _119,
        _120,
        _121,
        _122,
        _123,
        _124,
        _125,
        _126,
        _127,
        _128,
        _129,
        _130,
        _131,
        _132,
        _133,
        _134,
        _135,
        _136,
        _137,
        _138,
        _139,
        _140,
        _141,
        _142,
        _143,
        _144,
        _145,
        _146,
        _147,
        _148,
        _149,
        _150,
        _151,
        _152,
        _153,
        _154,
        _155,
        _156,
        _157,
        _158,
        _159,
        _160,
        _161,
        _162,
        _163,
        _164,
        _165,
        _166;
    try {
        const createdJobs = [];
        const parsedJobs = items;
        for (const row of parsedJobs) {
            let employer = await fetchEmployerByCompanyAndBranch({
                companyName:
                    (_b =
                        (_a =
                            row === null || row === void 0
                                ? void 0
                                : row.company) === null || _a === void 0
                            ? void 0
                            : _a.trim) === null || _b === void 0
                        ? void 0
                        : _b.call(_a),
                branchLocation:
                    (_d =
                        (_c =
                            row === null || row === void 0
                                ? void 0
                                : row.location) === null || _c === void 0
                            ? void 0
                            : _c.trim) === null || _d === void 0
                        ? void 0
                        : _d.call(_c),
            });
            await updateEmployerJobCount(row, employer);
            let employerMainBranch = {};
            const apiKey =
                (_e =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _e === void 0
                    ? void 0
                    : _e.GOOGLE_MAPS_API_KEY;
            // get the zipcode from location
            let zipCodeFromLocation;
            let countryFromLocation;
            let stateFromLocation;
            let cityFromLocation;
            let currentJobLat = 0;
            let currentJoblng = 0;
            console.log('step  ===> 3 getting the locaiton details');
            try {
                const zipCodeFromLocationResponse = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        (_g =
                            (_f =
                                row === null || row === void 0
                                    ? void 0
                                    : row.location) === null || _f === void 0
                                ? void 0
                                : _f.trim) === null || _g === void 0
                            ? void 0
                            : _g.call(_f)
                    )}&key=${apiKey}`
                );
                const zipCodeFromLocationData =
                    await (zipCodeFromLocationResponse === null ||
                    zipCodeFromLocationResponse === void 0
                        ? void 0
                        : zipCodeFromLocationResponse.json());
                // first fetch the lat and long for the jobs
                const { results } = zipCodeFromLocationData;
                if (
                    (results === null || results === void 0
                        ? void 0
                        : results.length) > 0
                ) {
                    const { lat, lng } =
                        (_j =
                            (_h =
                                results === null || results === void 0
                                    ? void 0
                                    : results[0]) === null || _h === void 0
                                ? void 0
                                : _h.geometry) === null || _j === void 0
                            ? void 0
                            : _j.location;
                    currentJobLat = lat;
                    currentJoblng = lng;
                }
                const addressComponents =
                    (_l =
                        (_k =
                            zipCodeFromLocationData === null ||
                            zipCodeFromLocationData === void 0
                                ? void 0
                                : zipCodeFromLocationData.results) === null ||
                        _k === void 0
                            ? void 0
                            : _k[0]) === null || _l === void 0
                        ? void 0
                        : _l.address_components;
                // extract the location name
                for (const component of addressComponents) {
                    if (
                        (_o =
                            (_m =
                                component === null || component === void 0
                                    ? void 0
                                    : component.types) === null || _m === void 0
                                ? void 0
                                : _m.includes) === null || _o === void 0
                            ? void 0
                            : _o.call(_m, 'postal_code')
                    ) {
                        zipCodeFromLocation =
                            component === null || component === void 0
                                ? void 0
                                : component.long_name;
                    }
                    if (
                        (_q =
                            (_p =
                                component === null || component === void 0
                                    ? void 0
                                    : component.types) === null || _p === void 0
                                ? void 0
                                : _p.includes) === null || _q === void 0
                            ? void 0
                            : _q.call(_p, 'country')
                    ) {
                        countryFromLocation =
                            component === null || component === void 0
                                ? void 0
                                : component.long_name;
                    }
                    if (
                        (_s =
                            (_r =
                                component === null || component === void 0
                                    ? void 0
                                    : component.types) === null || _r === void 0
                                ? void 0
                                : _r.includes) === null || _s === void 0
                            ? void 0
                            : _s.call(_r, 'administrative_area_level_1')
                    ) {
                        stateFromLocation =
                            component === null || component === void 0
                                ? void 0
                                : component.long_name;
                    }
                    if (
                        (_u =
                            (_t =
                                component === null || component === void 0
                                    ? void 0
                                    : component.types) === null || _t === void 0
                                ? void 0
                                : _t.includes) === null || _u === void 0
                            ? void 0
                            : _u.call(_t, 'administrative_area_level_2')
                    ) {
                        cityFromLocation =
                            component === null || component === void 0
                                ? void 0
                                : component.long_name;
                    }
                }
            } catch (error) {
                console.error('Got error => ', error);
            }
            // if there is employer but he doesn't have the photoUrl then fetch the main branch url
            if (
                employer &&
                (!(employer === null || employer === void 0
                    ? void 0
                    : employer.photoUrl) ||
                    (employer === null || employer === void 0
                        ? void 0
                        : employer.photoUrl) === '')
            ) {
                console.log('step  ===> 4 fetch the main job');
                employerMainBranch = await fetchEmployerMainBranch({
                    companyName:
                        (_w =
                            (_v =
                                row === null || row === void 0
                                    ? void 0
                                    : row.company) === null || _v === void 0
                                ? void 0
                                : _v.trim) === null || _w === void 0
                            ? void 0
                            : _w.call(_v),
                });
            }
            console.log('step  ===> 5 employer section');
            if (!employer) {
                console.log('step  ===> 6 creating new employer');
                const newEmployer = {
                    // name , email required to create new employer
                    name:
                        (_y =
                            (_x =
                                row === null || row === void 0
                                    ? void 0
                                    : row.company) === null || _x === void 0
                                ? void 0
                                : _x.trim) === null || _y === void 0
                            ? void 0
                            : _y.call(_x),
                    branchLocation:
                        (_0 =
                            (_z =
                                row === null || row === void 0
                                    ? void 0
                                    : row.location) === null || _z === void 0
                                ? void 0
                                : _z.trim) === null || _0 === void 0
                            ? void 0
                            : _0.call(_z),
                    email:
                        (row === null || row === void 0 ? void 0 : row.email) ||
                        ((_1 =
                            process === null || process === void 0
                                ? void 0
                                : process.env) === null || _1 === void 0
                            ? void 0
                            : _1.ADMIN_EMAIL),
                    zipCode: zipCodeFromLocation,
                    description:
                        (_6 =
                            (_3 =
                                (_2 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.companyInfo) === null ||
                                _2 === void 0
                                    ? void 0
                                    : _2.companyDescription) !== null &&
                            _3 !== void 0
                                ? _3
                                : (_5 =
                                      (_4 =
                                          row === null || row === void 0
                                              ? void 0
                                              : row.EmployerBio) === null ||
                                      _4 === void 0
                                          ? void 0
                                          : _4.trim) === null || _5 === void 0
                                ? void 0
                                : _5.call(_4)) !== null && _6 !== void 0
                            ? _6
                            : '',
                    addressLine1:
                        (_9 =
                            (_8 =
                                (_7 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.AddressLine1) === null ||
                                _7 === void 0
                                    ? void 0
                                    : _7.trim) === null || _8 === void 0
                                ? void 0
                                : _8.call(_7)) !== null && _9 !== void 0
                            ? _9
                            : '',
                    addressLine2:
                        (_12 =
                            (_11 =
                                (_10 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.AddressLine2) === null ||
                                _10 === void 0
                                    ? void 0
                                    : _10.trim) === null || _11 === void 0
                                ? void 0
                                : _11.call(_10)) !== null && _12 !== void 0
                            ? _12
                            : '',
                    city:
                        (_15 =
                            (_14 =
                                (_13 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.City) === null || _13 === void 0
                                    ? void 0
                                    : _13.trim) === null || _14 === void 0
                                ? void 0
                                : _14.call(_13)) !== null && _15 !== void 0
                            ? _15
                            : '',
                    bio:
                        (_20 =
                            (_17 =
                                (_16 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.companyInfo) === null ||
                                _16 === void 0
                                    ? void 0
                                    : _16.companyDescription) !== null &&
                            _17 !== void 0
                                ? _17
                                : (_19 =
                                      (_18 =
                                          row === null || row === void 0
                                              ? void 0
                                              : row.EmployerBio) === null ||
                                      _18 === void 0
                                          ? void 0
                                          : _18.trim) === null || _19 === void 0
                                ? void 0
                                : _19.call(_18)) !== null && _20 !== void 0
                            ? _20
                            : '',
                    contactEmail:
                        ((_22 =
                            (_21 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.ContactEmail) === null ||
                            _21 === void 0
                                ? void 0
                                : _21.trim) === null || _22 === void 0
                            ? void 0
                            : _22.call(_21)) ||
                        ((_23 =
                            process === null || process === void 0
                                ? void 0
                                : process.env) === null || _23 === void 0
                            ? void 0
                            : _23.ADMIN_EMAIL) ||
                        '',
                    contactName:
                        (_26 =
                            (_25 =
                                (_24 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.ContactName) === null ||
                                _24 === void 0
                                    ? void 0
                                    : _24.trim) === null || _25 === void 0
                                ? void 0
                                : _25.call(_24)) !== null && _26 !== void 0
                            ? _26
                            : '',
                    contactNumber:
                        (_29 =
                            (_28 =
                                (_27 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.ContactNumber) === null ||
                                _27 === void 0
                                    ? void 0
                                    : _27.trim) === null || _28 === void 0
                                ? void 0
                                : _28.call(_27)) !== null && _29 !== void 0
                            ? _29
                            : '',
                    contactBio:
                        (_32 =
                            (_31 =
                                (_30 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.ContactBiography) === null ||
                                _30 === void 0
                                    ? void 0
                                    : _30.trim) === null || _31 === void 0
                                ? void 0
                                : _31.call(_30)) !== null && _32 !== void 0
                            ? _32
                            : '',
                    country:
                        (_35 =
                            (_34 =
                                (_33 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.Country) === null ||
                                _33 === void 0
                                    ? void 0
                                    : _33.trim) === null || _34 === void 0
                                ? void 0
                                : _34.call(_33)) !== null && _35 !== void 0
                            ? _35
                            : '',
                    state:
                        (_38 =
                            (_37 =
                                (_36 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.State) === null || _36 === void 0
                                    ? void 0
                                    : _36.trim) === null || _37 === void 0
                                ? void 0
                                : _37.call(_36)) !== null && _38 !== void 0
                            ? _38
                            : '',
                    photoUrl:
                        (_45 =
                            (_42 =
                                (_40 =
                                    (_39 =
                                        employerMainBranch === null ||
                                        employerMainBranch === void 0
                                            ? void 0
                                            : employerMainBranch.photoUrl) !==
                                        null && _39 !== void 0
                                        ? _39
                                        : employer === null ||
                                          employer === void 0
                                        ? void 0
                                        : employer.photoUrl) !== null &&
                                _40 !== void 0
                                    ? _40
                                    : (_41 =
                                          row === null || row === void 0
                                              ? void 0
                                              : row.companyInfo) === null ||
                                      _41 === void 0
                                    ? void 0
                                    : _41.companyLogo) !== null &&
                            _42 !== void 0
                                ? _42
                                : (_44 =
                                      (_43 =
                                          row === null || row === void 0
                                              ? void 0
                                              : row.PhotoUrl) === null ||
                                      _43 === void 0
                                          ? void 0
                                          : _43.trim) === null || _44 === void 0
                                ? void 0
                                : _44.call(_43)) !== null && _45 !== void 0
                            ? _45
                            : '',
                    dateCreated: new Date(),
                    dateUpdated: new Date(),
                    userId:
                        (_46 =
                            process === null || process === void 0
                                ? void 0
                                : process.env) === null || _46 === void 0
                            ? void 0
                            : _46.ADMIN_USER_ID,
                    media: [],
                    partnerId: '',
                    requirements: '',
                    tagLine: '',
                    bannerImage: '',
                    companySize: '',
                    mission: '',
                    alumniLinks: [],
                    awardsAndAccolades: '',
                    benefitsAndPerks: '',
                    cultureAndEnvironment: '',
                    socialMediaLinks: [],
                    bookmarkedStudents: [],
                    bookmarkedUserApplications: [],
                    isHeadquarter: true,
                    reviewedStudents: [],
                    reviewedUserApplications: [],
                };
                const createdEmployer = await createEmployer(newEmployer);
                employer = createdEmployer;
            }
            console.log('step  ===> 7 setting up new job');
            const newJob = {
                // Must be available
                contactEmail:
                    (_51 =
                        (_48 =
                            (_47 =
                                employerMainBranch === null ||
                                employerMainBranch === void 0
                                    ? void 0
                                    : employerMainBranch.contactEmail) !==
                                null && _47 !== void 0
                                ? _47
                                : employer === null || employer === void 0
                                ? void 0
                                : employer.contactEmail) !== null &&
                        _48 !== void 0
                            ? _48
                            : (_50 =
                                  (_49 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.email) === null ||
                                  _49 === void 0
                                      ? void 0
                                      : _49.trim) === null || _50 === void 0
                            ? void 0
                            : _50.call(_49)) !== null && _51 !== void 0
                        ? _51
                        : (_52 =
                              process === null || process === void 0
                                  ? void 0
                                  : process.env) === null || _52 === void 0
                        ? void 0
                        : _52.ADMIN_EMAIL,
                country:
                    (_55 =
                        (_54 =
                            (_53 =
                                countryFromLocation !== null &&
                                countryFromLocation !== void 0
                                    ? countryFromLocation
                                    : employerMainBranch === null ||
                                      employerMainBranch === void 0
                                    ? void 0
                                    : employerMainBranch.country) !== null &&
                            _53 !== void 0
                                ? _53
                                : employer === null || employer === void 0
                                ? void 0
                                : employer.country) !== null && _54 !== void 0
                            ? _54
                            : row === null || row === void 0
                            ? void 0
                            : row.Country) !== null && _55 !== void 0
                        ? _55
                        : '',
                description:
                    (_58 =
                        (_57 =
                            (_56 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.description) === null ||
                            _56 === void 0
                                ? void 0
                                : _56.trim) === null || _57 === void 0
                            ? void 0
                            : _57.call(_56)) !== null && _58 !== void 0
                        ? _58
                        : '',
                descriptionHTML:
                    (_61 =
                        (_60 =
                            (_59 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.descriptionHTML) === null ||
                            _59 === void 0
                                ? void 0
                                : _59.trim) === null || _60 === void 0
                            ? void 0
                            : _60.call(_59)) !== null && _61 !== void 0
                        ? _61
                        : '',
                city:
                    (_71 =
                        (_66 =
                            (_63 =
                                (_62 =
                                    cityFromLocation !== null &&
                                    cityFromLocation !== void 0
                                        ? cityFromLocation
                                        : employerMainBranch === null ||
                                          employerMainBranch === void 0
                                        ? void 0
                                        : employerMainBranch.city) !== null &&
                                _62 !== void 0
                                    ? _62
                                    : employer === null || employer === void 0
                                    ? void 0
                                    : employer.city) !== null && _63 !== void 0
                                ? _63
                                : (_65 =
                                      (_64 =
                                          row === null || row === void 0
                                              ? void 0
                                              : row.City) === null ||
                                      _64 === void 0
                                          ? void 0
                                          : _64.trim) === null || _65 === void 0
                                ? void 0
                                : _65.call(_64)) !== null && _66 !== void 0
                            ? _66
                            : (_70 =
                                  (_69 =
                                      (_68 =
                                          (_67 =
                                              row === null || row === void 0
                                                  ? void 0
                                                  : row.location) === null ||
                                          _67 === void 0
                                              ? void 0
                                              : _67.trim) === null ||
                                      _68 === void 0
                                          ? void 0
                                          : _68.call(_67)) === null ||
                                  _69 === void 0
                                      ? void 0
                                      : _69.split(',')) === null ||
                              _70 === void 0
                            ? void 0
                            : _70[0]) !== null && _71 !== void 0
                        ? _71
                        : '',
                employerEmail:
                    (_76 =
                        (_73 =
                            (_72 =
                                employerMainBranch === null ||
                                employerMainBranch === void 0
                                    ? void 0
                                    : employerMainBranch.email) !== null &&
                            _72 !== void 0
                                ? _72
                                : employer === null || employer === void 0
                                ? void 0
                                : employer.email) !== null && _73 !== void 0
                            ? _73
                            : (_75 =
                                  (_74 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.email) === null ||
                                  _74 === void 0
                                      ? void 0
                                      : _74.trim) === null || _75 === void 0
                            ? void 0
                            : _75.call(_74)) !== null && _76 !== void 0
                        ? _76
                        : (_77 =
                              process === null || process === void 0
                                  ? void 0
                                  : process.env) === null || _77 === void 0
                        ? void 0
                        : _77.ADMIN_EMAIL,
                employerName:
                    (_82 =
                        (_79 =
                            (_78 =
                                employerMainBranch === null ||
                                employerMainBranch === void 0
                                    ? void 0
                                    : employerMainBranch.name) !== null &&
                            _78 !== void 0
                                ? _78
                                : employer === null || employer === void 0
                                ? void 0
                                : employer.name) !== null && _79 !== void 0
                            ? _79
                            : (_81 =
                                  (_80 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.company) === null ||
                                  _80 === void 0
                                      ? void 0
                                      : _80.trim) === null || _81 === void 0
                            ? void 0
                            : _81.call(_80)) !== null && _82 !== void 0
                        ? _82
                        : '',
                pay:
                    (_84 =
                        (_83 =
                            row === null || row === void 0
                                ? void 0
                                : row.salary) !== null && _83 !== void 0
                            ? _83
                            : row === null || row === void 0
                            ? void 0
                            : row.Pay) !== null && _84 !== void 0
                        ? _84
                        : '',
                payDescription:
                    (_85 =
                        row === null || row === void 0
                            ? void 0
                            : row.salary) !== null && _85 !== void 0
                        ? _85
                        : '',
                branchLocation:
                    (_91 =
                        (_88 =
                            (_87 =
                                (_86 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.BranchLocation) === null ||
                                _86 === void 0
                                    ? void 0
                                    : _86.trim) === null || _87 === void 0
                                ? void 0
                                : _87.call(_86)) !== null && _88 !== void 0
                            ? _88
                            : (_90 =
                                  (_89 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.location) === null ||
                                  _89 === void 0
                                      ? void 0
                                      : _89.trim) === null || _90 === void 0
                            ? void 0
                            : _90.call(_89)) !== null && _91 !== void 0
                        ? _91
                        : '',
                zipCode:
                    (_95 =
                        (_94 =
                            (_93 =
                                (_92 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.ZipCode) === null ||
                                _92 === void 0
                                    ? void 0
                                    : _92.trim) === null || _93 === void 0
                                ? void 0
                                : _93.call(_92)) !== null && _94 !== void 0
                            ? _94
                            : zipCodeFromLocation) !== null && _95 !== void 0
                        ? _95
                        : '',
                // If not avaialbe then it's ok to add as empty
                addressLine1:
                    (_98 =
                        (_97 =
                            (_96 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.AddressLine1) === null ||
                            _96 === void 0
                                ? void 0
                                : _96.trim) === null || _97 === void 0
                            ? void 0
                            : _97.call(_96)) !== null && _98 !== void 0
                        ? _98
                        : '',
                addressLine2:
                    (_101 =
                        (_100 =
                            (_99 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.AddressLine2) === null ||
                            _99 === void 0
                                ? void 0
                                : _99.trim) === null || _100 === void 0
                            ? void 0
                            : _100.call(_99)) !== null && _101 !== void 0
                        ? _101
                        : '',
                // recruiter info
                contactBio:
                    (_104 =
                        (_103 =
                            (_102 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.ContactBiography) === null ||
                            _102 === void 0
                                ? void 0
                                : _102.trim) === null || _103 === void 0
                            ? void 0
                            : _103.call(_102)) !== null && _104 !== void 0
                        ? _104
                        : '',
                contactName:
                    (_107 =
                        (_106 =
                            (_105 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.ContactName) === null ||
                            _105 === void 0
                                ? void 0
                                : _105.trim) === null || _106 === void 0
                            ? void 0
                            : _106.call(_105)) !== null && _107 !== void 0
                        ? _107
                        : '',
                contactNumber:
                    (_110 =
                        (_109 =
                            (_108 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.ContactNumber) === null ||
                            _108 === void 0
                                ? void 0
                                : _108.trim) === null || _109 === void 0
                            ? void 0
                            : _109.call(_108)) !== null && _110 !== void 0
                        ? _110
                        : '',
                payPeriod:
                    (_113 =
                        (_112 =
                            (_111 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.PayPeriod) === null || _111 === void 0
                                ? void 0
                                : _111.trim) === null || _112 === void 0
                            ? void 0
                            : _112.call(_111)) !== null && _113 !== void 0
                        ? _113
                        : '',
                searchKeywords:
                    (_119 =
                        (_116 =
                            (_115 =
                                (_114 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.Keywords) === null ||
                                _114 === void 0
                                    ? void 0
                                    : _114.trim) === null || _115 === void 0
                                ? void 0
                                : _115.call(_114)) !== null && _116 !== void 0
                            ? _116
                            : (_118 =
                                  (_117 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.Search_Keyword) === null ||
                                  _117 === void 0
                                      ? void 0
                                      : _117.trim) === null || _118 === void 0
                            ? void 0
                            : _118.call(_117)) !== null && _119 !== void 0
                        ? _119
                        : '',
                days:
                    (_122 =
                        (_121 =
                            (_120 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.Days) === null || _120 === void 0
                                ? void 0
                                : _120.split) === null || _121 === void 0
                            ? void 0
                            : _121.call(_120, ',')) !== null && _122 !== void 0
                        ? _122
                        : '',
                daysDescription:
                    (_125 =
                        (_124 =
                            (_123 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.DaysDescription) === null ||
                            _123 === void 0
                                ? void 0
                                : _123.trim) === null || _124 === void 0
                            ? void 0
                            : _124.call(_123)) !== null && _125 !== void 0
                        ? _125
                        : '',
                shiftDescription:
                    (_128 =
                        (_127 =
                            (_126 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.ShiftDescription) === null ||
                            _126 === void 0
                                ? void 0
                                : _126.trim) === null || _127 === void 0
                            ? void 0
                            : _127.call(_126)) !== null && _128 !== void 0
                        ? _128
                        : '',
                shift:
                    (_130 =
                        (_129 =
                            row === null || row === void 0
                                ? void 0
                                : row.Shift) === null || _129 === void 0
                            ? void 0
                            : _129.split(',')) !== null && _130 !== void 0
                        ? _130
                        : [],
                employerBio:
                    (_137 =
                        (_134 =
                            (_132 =
                                (_131 =
                                    employerMainBranch === null ||
                                    employerMainBranch === void 0
                                        ? void 0
                                        : employerMainBranch.bio) !== null &&
                                _131 !== void 0
                                    ? _131
                                    : employer === null || employer === void 0
                                    ? void 0
                                    : employer.bio) !== null && _132 !== void 0
                                ? _132
                                : (_133 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.companyInfo) === null ||
                                  _133 === void 0
                                ? void 0
                                : _133.companyDescription) !== null &&
                        _134 !== void 0
                            ? _134
                            : (_136 =
                                  (_135 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.EmployerBio) === null ||
                                  _135 === void 0
                                      ? void 0
                                      : _135.trim) === null || _136 === void 0
                            ? void 0
                            : _136.call(_135)) !== null && _137 !== void 0
                        ? _137
                        : '',
                employerPhotoUrl:
                    (_141 =
                        (_139 =
                            (_138 =
                                employer === null || employer === void 0
                                    ? void 0
                                    : employer.photoUrl) !== null &&
                            _138 !== void 0
                                ? _138
                                : employerMainBranch === null ||
                                  employerMainBranch === void 0
                                ? void 0
                                : employerMainBranch.photoUrl) !== null &&
                        _139 !== void 0
                            ? _139
                            : (_140 =
                                  row === null || row === void 0
                                      ? void 0
                                      : row.companyInfo) === null ||
                              _140 === void 0
                            ? void 0
                            : _140.companyLogo) !== null && _141 !== void 0
                        ? _141
                        : '',
                hoursDescription:
                    (_145 =
                        (_144 =
                            (_143 =
                                (_142 =
                                    row === null || row === void 0
                                        ? void 0
                                        : row.jobType) === null ||
                                _142 === void 0
                                    ? void 0
                                    : _142[0]) === null || _143 === void 0
                                ? void 0
                                : _143.trim) === null || _144 === void 0
                            ? void 0
                            : _144.call(_143)) !== null && _145 !== void 0
                        ? _145
                        : '',
                hours:
                    (_148 =
                        (_147 =
                            (_146 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.HoursPerWeek) === null ||
                            _146 === void 0
                                ? void 0
                                : _146.trim) === null || _147 === void 0
                            ? void 0
                            : _147.call(_146)) !== null && _148 !== void 0
                        ? _148
                        : '',
                language:
                    (_151 =
                        (_150 =
                            (_149 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.Language) === null || _149 === void 0
                                ? void 0
                                : _149.trim) === null || _150 === void 0
                            ? void 0
                            : _150.call(_149)) !== null && _151 !== void 0
                        ? _151
                        : '',
                state:
                    (_154 =
                        stateFromLocation !== null &&
                        stateFromLocation !== void 0
                            ? stateFromLocation
                            : (_153 =
                                  (_152 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.State) === null ||
                                  _152 === void 0
                                      ? void 0
                                      : _152.trim) === null || _153 === void 0
                            ? void 0
                            : _153.call(_152)) !== null && _154 !== void 0
                        ? _154
                        : '',
                title:
                    (_157 =
                        (_156 =
                            (_155 =
                                row === null || row === void 0
                                    ? void 0
                                    : row.positionName) === null ||
                            _155 === void 0
                                ? void 0
                                : _155.trim) === null || _156 === void 0
                            ? void 0
                            : _156.call(_155)) !== null && _157 !== void 0
                        ? _157
                        : '',
                id: '',
                dateCreated: new Date(),
                dateUpdated: new Date(),
                _geoloc: { lat: currentJobLat, lng: currentJoblng },
                expireDate: '',
                applyDate: new Date(),
                isActive: true,
                isRemote: false,
                rankIndex: getJobCountByEmail(
                    (row === null || row === void 0 ? void 0 : row.email) ||
                        (row === null || row === void 0 ? void 0 : row.Email) ||
                        ((_158 =
                            process === null || process === void 0
                                ? void 0
                                : process.env) === null || _158 === void 0
                            ? void 0
                            : _158.ADMIN_EMAIL)
                ),
                noOfPositions: 1,
                employerId:
                    (_160 =
                        (_159 =
                            employerMainBranch === null ||
                            employerMainBranch === void 0
                                ? void 0
                                : employerMainBranch.id) !== null &&
                        _159 !== void 0
                            ? _159
                            : employer === null || employer === void 0
                            ? void 0
                            : employer.id) !== null && _160 !== void 0
                        ? _160
                        : '',
                employerNumber: '',
                program:
                    (_161 =
                        selectedLinkJobData === null ||
                        selectedLinkJobData === void 0
                            ? void 0
                            : selectedLinkJobData.program) !== null &&
                    _161 !== void 0
                        ? _161
                        : [],
                jobLink:
                    (row === null || row === void 0
                        ? void 0
                        : row.externalApplyLink) ||
                    (row === null || row === void 0 ? void 0 : row.url),
                photoUrl:
                    (_166 =
                        (_165 =
                            (_163 =
                                (_162 =
                                    employerMainBranch === null ||
                                    employerMainBranch === void 0
                                        ? void 0
                                        : employerMainBranch.photoUrl) !==
                                    null && _162 !== void 0
                                    ? _162
                                    : employer === null || employer === void 0
                                    ? void 0
                                    : employer.photoUrl) !== null &&
                            _163 !== void 0
                                ? _163
                                : (_164 =
                                      row === null || row === void 0
                                          ? void 0
                                          : row.companyInfo) === null ||
                                  _164 === void 0
                                ? void 0
                                : _164.companyLogo) !== null && _165 !== void 0
                            ? _165
                            : row === null || row === void 0
                            ? void 0
                            : row.photoUrl) !== null && _166 !== void 0
                        ? _166
                        : '',
            };
            createdJobs.push(newJob);
        }
        // now upload all of the jobs to jobs collections
        console.log('step  ===> 8 creating the jobs');
        for (const singleJob of createdJobs) {
            console.log('created this job', singleJob);
            await setJobApi(singleJob);
        }
    } catch (error) {
        console.log('parseData in bulk upload failed with', error);
    }
};
async function scrapeAndUploadJobs(apifyInput, selectedLinkJobData) {
    var _a, _b;
    try {
        // Initialize the ApifyClient with API token
        const apifyClient = new apify_client_1.ApifyClient({
            token:
                (_a =
                    process === null || process === void 0
                        ? void 0
                        : process.env) === null || _a === void 0
                    ? void 0
                    : _a.APIFY_CLIENT_ID,
        });
        // Start an Actor that scrapes jobs from Indeed
        const actorId =
            (_b =
                process === null || process === void 0
                    ? void 0
                    : process.env) === null || _b === void 0
                ? void 0
                : _b.APIFY_SCRAPPER_ACTOR_ID;
        const { defaultDatasetId } = await apifyClient
            .actor(actorId)
            .call(apifyInput);
        // Fetch results from the dataset
        const { items } = await apifyClient
            .dataset(defaultDatasetId)
            .listItems();
        await parseData(items, selectedLinkJobData);
        // fs.writeFileSync(`jobs.json`, JSON.stringify(items, null, 2));
    } catch (error) {
        console.log('scrapeAndUploadJobs in bulk upload failed with  ', error);
    }
}
// Function to handle individual scraping and uploading
const scrapeJobForUrl = async (selectedLinkJobData) => {
    const apifyInput = {
        followApplyRedirects: false,
        maxItems: 5,
        maxItemsPerSearch: 5,
        parseCompanyDetails: true,
        saveOnlyUniqueItems: true,
        startUrls: [
            {
                url:
                    selectedLinkJobData === null ||
                    selectedLinkJobData === void 0
                        ? void 0
                        : selectedLinkJobData.url,
            },
        ],
    };
    try {
        await scrapeAndUploadJobs(apifyInput, selectedLinkJobData);
        console.log(
            `Scraping and uploading for ${
                selectedLinkJobData === null || selectedLinkJobData === void 0
                    ? void 0
                    : selectedLinkJobData.url
            } completed.`
        );
    } catch (err) {
        console.error(
            `Error occurred for ${
                selectedLinkJobData === null || selectedLinkJobData === void 0
                    ? void 0
                    : selectedLinkJobData.url
            }:`,
            err
        );
    }
};
// once per week
const scheduleBulkUploadJobsCron = () => {
    // Schedule task to run every week at midnight on Sunday
    cron.schedule('0 0 * * 0', async () => {
        try {
            console.log('Running a task every week at midnight on Sunday');
            // Loop through each job position URL and process them one by one
            for (const job of listOfJobPostionsToScrapJobsFor) {
                await scrapeJobForUrl(job);
            }
            console.log('All job postings have been processed.');
        } catch (error) {
            console.log('scheduleBulkUploadJobsCron failed with', error);
        }
    });
};
exports.scheduleBulkUploadJobsCron = scheduleBulkUploadJobsCron;
//# sourceMappingURL=index.js.map
