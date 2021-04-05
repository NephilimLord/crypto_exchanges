import * as https from 'https';
import * as config from 'config';

const API_TOKEN = config.get('apiToken');

export const getThirdPartyExchange = async (fsyms: string, tsyms: string): Promise<any> => {
  const options: any = {
    host: 'min-api.cryptocompare.com',
    port: 443,
    path: `/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    }
  };

  return new Promise((resolve, reject) => {
    https.get(options, (res: any) => {
      res.setEncoding('utf8');
      let resultResponse = '';
      res.on('data', (data) => resultResponse += data);

      res.on('end', () => {
        let parsedData;
        try {
          resultResponse.length && (parsedData = JSON.parse(resultResponse));
        } catch (e) {}

        resolve({
          ...res,
          body: JSON.parse(resultResponse),
        });
      });
    }).on('error', (err) => reject(err));
  });
}
