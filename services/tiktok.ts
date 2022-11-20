export default function tiktok(): string {
  const csrfState = Math.random().toString(36).substring(2);

  let url = 'https://www.tiktok.com/auth/authorize/';

  url += '?client_key=awagptjbwxwwq0rm';
  url += '&scope=user.info.basic,video.list';
  url += '&response_type=code';
  url += '&redirect_uri=iris-api-sdzp.onrender.com/tiktokAUTHCallback';
  url += `&state=${csrfState}`;

  return url;
}
