import TimeAgo, { type LocaleData } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en as LocaleData);
TimeAgo.setDefaultLocale('en');

export default function timeAgo(date: Date | number): string {
  const timeAgo = new TimeAgo('en-US');
  const formated = timeAgo.format(date, 'twitter-now');

  if (typeof formated === 'string') {
    return formated;
  }

  return formated[0];
}
