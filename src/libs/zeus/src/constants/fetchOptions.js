import config from '../../../../../config';

const baseUrl = process.env.NODE_ENV === 'production'
              ? config.url.host
              : `${config.url.host}:${config.url.port}`;

export const API_CREATE = `${baseUrl}/api/create`;
export const API_DELETE = `${baseUrl}/api/annotations?id=`;
