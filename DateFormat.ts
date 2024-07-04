import { format, formatDistance, formatRelative, subDays, formatDuration, intervalToDuration } from 'date-fns';
import { enUS, ru, be } from 'date-fns/locale';

interface DateFormatOptions {
  date: Date;
  formatType: 'full' | 'numeric' | 'short' | 'distance' | 'distanceShort';
}

function getLocaleFromStorage(): string {
  return localStorage.getItem('language') || 'en';
}

function getLocale(language: string) {
  switch (language) {
    case 'ru':
      return ru;
    case 'be':
      return be;
    case 'en':
    default:
      return enUS;
  }
}

function dataFormat({ date, formatType }: DateFormatOptions): string {
  const language = getLocaleFromStorage();
  const selectedLocale = getLocale(language);

  switch (formatType) {
    case 'full':
      return format(date, 'd MMMM yyyy', { locale: selectedLocale });
    case 'numeric':
      return format(date, 'dd.MM.yyyy');
    case 'short':
      return format(date, 'd MMM', { locale: selectedLocale });
    case 'distance':
      return formatDistance(new Date(), date, { locale: selectedLocale, addSuffix: true });
    case 'distanceShort':
      const duration = intervalToDuration({ start: date, end: new Date() });
      const formattedDuration = [
        duration.years ? `${duration.years} г` : '',
        duration.months ? `${duration.months} мес` : '',
        duration.days ? `${duration.days} д` : '',
        duration.hours ? `${duration.hours} ч` : '',
        duration.minutes ? `${duration.minutes} м` : '',
        duration.seconds ? `${duration.seconds} сек` : '',
      ].filter(Boolean).join(' ');

      return formattedDuration || '0 сек';
    default:
      throw new Error('Invalid format type');
  }
}

// Пример использования:
const options: DateFormatOptions = {
  date: new Date(),
  formatType: 'full',
};

console.log(dataFormat(options));
