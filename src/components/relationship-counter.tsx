'use client';

import { useEffect, useState } from 'react';
import { intervalToDuration, format, differenceInSeconds } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RelationshipCounterProps {
  startDate: Date;
}

const RelationshipCounter = ({ startDate }: RelationshipCounterProps) => {
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Ensure startDate is a valid date before proceeding
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
      return;
    }
      
    const timer = setInterval(() => {
      const now = new Date();
      if (now < startDate) {
        return; // Don't run counter for future dates
      }
      const interval = intervalToDuration({ start: startDate, end: now });
      setDuration({
        years: interval.years || 0,
        months: interval.months || 0,
        days: interval.days || 0,
        hours: interval.hours || 0,
        minutes: interval.minutes || 0,
        seconds: interval.seconds || 0,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  // Initial check to avoid rendering with all zeros if date is invalid
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
    return null;
  }
    
  // Don't render anything if the date is in the future
  if (differenceInSeconds(new Date(), startDate) < 0) {
      return null;
  }

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="text-center my-4 space-y-2">
      <p className="text-sm font-light text-white/90">
        Compartilhando momentos há {pad(duration.years)} anos {pad(duration.months)} meses {pad(duration.days)} dias {pad(duration.hours)} horas {pad(duration.minutes)} minutos {pad(duration.seconds)} segundos ❤️‍🔥
      </p>
      <p className="text-xs text-neutral-400">
        Desde {format(startDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </p>
    </div>
  );
};

export default RelationshipCounter;
