export default function getErrorMsg(json) {
  if (!json) {
    return 'Missing parsed response JSON body';
  }

  return `${json.status} ${
    typeof json.message === 'string'
      ? json.message
      : json.message?.map(issue => `${issue.path[0]}: ${issue.message}`).join('; ')
  }`;
}
