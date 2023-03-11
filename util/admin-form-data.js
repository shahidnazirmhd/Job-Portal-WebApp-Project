const db = require('../data/database');

async function getJobTypes() {
    const result = await db.getDb().collection('formInputListData').findOne({getby: 'jobTypes'});
    return result.jobtype;
  }
async function getWorkTypes() {
    const result = await db.getDb().collection('formInputListData').findOne({getby: 'workTypes'});
    return result.worktype;
  }
async function getInterviewTypes() {
    const result = await db.getDb().collection('formInputListData').findOne({getby: 'interviewTypes'});
    return result.interviewtype;
  }    

async  function getFormInputList() {
    const jobtype = await getJobTypes();
    const worktype = await getWorkTypes();
    const interviewtype = await getInterviewTypes();

    const formInputList = {
        jobTypes: Object.values(jobtype),
        workTypes: Object.values(worktype),
        interviewTypes: Object.values(interviewtype)
    };
    return formInputList;

  }
   module.exports = {
    getFormInputList: getFormInputList
   };