export const ID = 'id';
export const HEALTH_TIPS = 'healthTips';

export const TODAY = new Date();
export const START_OF_WEEK = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate() - TODAY.getDay()
);

export const cardColor = new Map<string, string>([
  ['DoctorHealthTip', '#3ecd5e'],
  ['PsychoHealthTip', '#e44002'],
  ['FamilyHealthTip', '#952aff'],
  ['FitnessHealthTip', '#cd3e94'],
  ['InsuranceHealthTip', '#4c49ea'],
]);

export const healthTipParams = {
  q: '',
  _sort: '',
  _order: '',
};
