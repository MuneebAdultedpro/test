'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.seedDataSequentially =
    exports.seedCareerPathWithInsights =
    exports.seedQuestions =
        void 0;
const tslib_1 = require('tslib');
const fs_1 = tslib_1.__importDefault(require('fs'));
const path_1 = tslib_1.__importDefault(require('path'));
// import dotenv from 'dotenv';
const models_1 = require('../mvc/models');
// export async function seedQuestions() {
//     try {
//         // Fetch all career paths from the existing collection
//         const careerPathsFromDB = await CareerPathWithInsights.find(
//             {},
//             '_id name'
//         );
//         // Convert array of objects to a lookup map for quick matching
//         const careerPathMap = new Map();
//         careerPathsFromDB.forEach((careerPath) => {
//             careerPathMap.set(careerPath.name.en, careerPath._id); // Store English name as key and ObjectId as value
//         });
//         // Load the career path grouping file
//         const careerPathWithInsightsFilePath = path.resolve(
//             __dirname,
//             '../data/seeding-data/career-path-Options.seed.json'
//         );
//         const questionsFilePath = path.resolve(
//             __dirname,
//             '../data/seeding-data/questions.seed.json'
//         );
//         const careerPathGroups = JSON.parse(
//             fs.readFileSync(careerPathWithInsightsFilePath, 'utf-8')
//         );
//         const questionsFromJSON = JSON.parse(
//             fs.readFileSync(questionsFilePath, 'utf-8')
//         );
//         // Convert JSON data to match the multilingual schema
//         const processedQuestions = questionsFromJSON.map((question, index) => {
//             // Ensure `careerPathGroups` exists for this index
//             const careerPathsForQuestion = careerPathGroups[index] || []; // all career path for each option
//             console.log(careerPathsForQuestion);
//             const arrayOfCareerPaths = [];
//             careerPathsForQuestion.forEach((CareerPathsOnEachIndex) => {
//                 let arr = []; // External array to store results
//                 CareerPathsOnEachIndex.forEach((EachCareerPath) => {
//                     const careerPathId = careerPathMap.get(EachCareerPath);
//                     if (careerPathId) {
//                         arr.push(careerPathId.toString()); // Push to external array
//                     }
//                 });
//                 arrayOfCareerPaths.push(arr);
//             });
//             // Process options with their own careerPaths
//             const optionsWithCareerPaths = question.options.map(
//                 (option, optIndex) => {
//                     return {
//                         optionLabel: { en: option, es: option, tl: option },
//                         careerPathsId: arrayOfCareerPaths[optIndex], // Attach career path `_id`s to each option
//                     };
//                 }
//             );
//             const formattedQuestion = {
//                 questionLabel: {
//                     en: question.question,
//                     es: question.question, // Placeholder for now
//                     tl: question.question,
//                 },
//                 options: optionsWithCareerPaths, // Store processed multilingual options with careerPaths
//                 order: question.id,
//             };
//             return formattedQuestion;
//         });
//         console.log('✅ Final Processed Questions:', processedQuestions);
//         debugger;
//         // Delete existing data before seeding
//         console.log('🔹 Deleting existing assessment questions...');
//         await StudentAssessmentQuestionModel.deleteMany({});
//         console.log('✅ Deleted all previous questions.');
//         debugger;
//         // Insert new multilingual questions
//         console.log('🔹 Inserting new questions into database...');
//         await StudentAssessmentQuestionModel.insertMany(processedQuestions);
//         console.log(
//             '✅ Assessment questions seeded successfully with multilingual support!'
//         );
//         debugger;
//     } catch (error) {
//         console.error('❌ Error seeding questions:', error.message);
//         console.error('Stack trace:', error.stack);
//         debugger;
//     }
// }
async function seedQuestions() {
    try {
        // Fetch all career paths from the existing collection
        const careerPathsFromDB = await models_1.CareerPathWithInsights.find(
            {},
            '_id name'
        );
        // Convert array of objects to a lookup map for quick matching
        const careerPathMap = new Map(
            careerPathsFromDB.map((careerPath) => [
                careerPath.name.en,
                careerPath._id,
            ])
        );
        // Load and parse career path grouping and questions data in parallel
        const [careerPathWithInsightsData, questionsFromJSON] =
            await Promise.all([
                fs_1.default.promises.readFile(
                    path_1.default.resolve(
                        __dirname,
                        '../data/seeding-data/career-path-Options.seed.json'
                    ),
                    'utf-8'
                ),
                fs_1.default.promises.readFile(
                    path_1.default.resolve(
                        __dirname,
                        '../data/seeding-data/questions.seed.json'
                    ),
                    'utf-8'
                ),
            ]);
        const careerPathGroups = JSON.parse(careerPathWithInsightsData);
        const questionsParsed = JSON.parse(questionsFromJSON);
        // Convert JSON data to match the multilingual schema
        const processedQuestions = questionsParsed.map((question, index) => {
            const careerPathsForQuestion = careerPathGroups[index] || [];
            const arrayOfCareerPaths = careerPathsForQuestion.map(
                (CareerPathsOnEachIndex) =>
                    CareerPathsOnEachIndex.map((EachCareerPath) => {
                        const careerPathId = careerPathMap.get(EachCareerPath);
                        return careerPathId ? careerPathId.toString() : null;
                    }).filter(Boolean) // Remove nulls from the array
            );
            // Process options with their own careerPaths
            const optionsWithCareerPaths = question.options.map(
                (option, optIndex) => ({
                    optionLabel: { en: option, es: option, tl: option },
                    careerPathsId: arrayOfCareerPaths[optIndex], // Attach career path `_id`s to each option
                })
            );
            return {
                questionLabel: {
                    en: question.question,
                    es: question.question,
                    tl: question.question,
                },
                options: optionsWithCareerPaths,
                order: question.id,
            };
        });
        console.log('✅ Final Processed Questions:', processedQuestions);
        // Delete existing data before seeding
        console.log('🔹 Deleting existing assessment questions...');
        await models_1.StudentAssessmentQuestionModel.deleteMany({});
        console.log('✅ Deleted all previous questions.');
        // Insert new multilingual questions
        console.log('🔹 Inserting new questions into database...');
        await models_1.StudentAssessmentQuestionModel.insertMany(
            processedQuestions
        );
        console.log(
            '✅ Assessment questions seeded successfully with multilingual support!'
        );
    } catch (error) {
        console.error('❌ Error seeding questions:', error.message);
        console.error('Stack trace:', error.stack);
    }
}
exports.seedQuestions = seedQuestions;
async function seedCareerPathWithInsights() {
    try {
        const careerPathWithInsightsFilePath = path_1.default.resolve(
            __dirname,
            '../data/seeding-data/career-path-with-insights.json'
        );
        // Read and Parse JSON Data
        const careerOptionsFromJSON = JSON.parse(
            fs_1.default.readFileSync(careerPathWithInsightsFilePath, 'utf-8')
        );
        console.log(careerOptionsFromJSON);
        // Convert JSON data to match the multilingual schema
        const formattedCareerOptions = careerOptionsFromJSON.map((option) => ({
            name: {
                en: option.name,
                es: option.name,
                tl: option.name, // Placeholder: Copy English text
            },
            whyChoose: {
                en: option.whyChoose,
                es: option.whyChoose,
                tl: option.whyChoose, // Placeholder: Copy English text
            },
            careerInsights: option.careerInsights.map((insight) => ({
                en: insight,
                es: insight,
                tl: insight, // Placeholder: Copy English text
            })),
        }));
        // Delete existing data before seeding
        await models_1.CareerPathWithInsights.deleteMany({});
        console.log(formattedCareerOptions);
        // Insert new multilingual career path data
        await models_1.CareerPathWithInsights.insertMany(
            formattedCareerOptions
        );
        console.log(
            'Career paths seeded successfully with multilingual support!'
        );
    } catch (error) {
        console.error('Error seeding career paths:', error.message);
    }
}
exports.seedCareerPathWithInsights = seedCareerPathWithInsights;
const seedDataSequentially = async () => {
    try {
        console.log('Seeding Career Paths with Insights...');
        await seedCareerPathWithInsights(); // Ensure this completes first
        console.log('✅ Career Paths with Insights seeded successfully.');
        console.log('Seeding Assessment Questions...');
        await seedQuestions(); // Runs only after the first one is done
        console.log('✅ Assessment Questions seeded successfully.');
        console.log('Seeding process completed.');
    } catch (error) {
        console.error('❌ Seeding process failed:', error.message);
    }
};
exports.seedDataSequentially = seedDataSequentially;
// export async function seedCareerPathWithInsightsData() {
//     try {
//         const careerOptionFilePath = path.resolve(
//             __dirname,
//             '../init/career-path-with-data.seed.json'
//         );
//         // Read and parse JSON data
//         const careerOptionsWithDataFromJSON = JSON.parse(
//             fs.readFileSync(careerOptionFilePath, 'utf-8')
//         );
//         await StudentAssessmentCareerPathWithDataModel.deleteMany({});
//         await StudentAssessmentCareerPathWithDataModel.insertMany(
//             careerOptionsWithDataFromJSON
//         );
//     } catch (error) {
//         console.error('Error seeding career paths:', error.message);
//     } finally {
//     }
// }
//# sourceMappingURL=seedQuestions.js.map
