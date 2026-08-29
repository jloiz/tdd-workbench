const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmasOld() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}

/* What makes this code hard to test:
  - Date instantiated inside the method
  - Relies on the current date
  */

// REFACTORED CODE BELOW

export function daysUntilChristmas(currentDate) {
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const christmasDay = new Date(currentDate.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
