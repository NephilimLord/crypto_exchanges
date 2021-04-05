export const parseDbResponse = async (request: Promise<any>): Promise<any> =>
  request.then(result => JSON.parse(JSON.stringify(result))).catch(e => e);
