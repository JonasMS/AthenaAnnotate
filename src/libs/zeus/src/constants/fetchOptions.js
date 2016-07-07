import config from '../../../../../config';

const baseUrl = `${config.url.host}:${config.url.port}`;

export const API_CREATE = `${baseUrl}/api/create`;
export const API_DELETE = `${baseUrl}/api/annotations?id=`;
