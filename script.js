import {
	format,
	subMonths,
	addMonths,
	startOfMonth,
	getDaysInMonth,
	lastDayOfMonth,
	getDay,
	subDays,
	getDate,
	addDays,
	eachDayOfInterval,
	isSameMonth,
	isToday,
} from 'date-fns';

const expBtn = document.querySelector('.expand-button');
const calendar = document.querySelector('.calendar-container');
const header = document.querySelector('.date-header');
const prevMonthBtn = document.querySelector('.prev-month-button');
const nextMonthBtn = document.querySelector('.next-month-button');
const monthAndYear = document.querySelector('.month-year');
const dates = Array.from(document.querySelectorAll('.date'));

let date = new Date();

document.addEventListener('DOMContentLoaded', (e) => {
	displayCurrentDate();
	header.classList.add('header-only');
});

document.addEventListener('click', (e) => {
	if (!e.target.closest('.button-wrapper')) return;
	if (calendar.classList.contains('visible')) {
		hideCalendar();
	} else {
		displayCurrentMonth();
		displayCalendar();
		setCalendarMonth();
	}
});

nextMonthBtn.addEventListener('click', (e) => {
	displayNextMonth();
	setCalendarMonth();
});

prevMonthBtn.addEventListener('click', (e) => {
	displayPreviousMonth();
	setCalendarMonth();
});

function displayPreviousMonth() {
	date = subMonths(date, 1);
	displayMonthAndYear();
}

function displayNextMonth() {
	date = addMonths(date, 1);
	displayMonthAndYear();
}

function displayCurrentDate() {
	const currentDate = document.querySelector('.current-date');
	currentDate.textContent = format(new Date(), 'EEEE do. MMMM');
}

function displayMonthAndYear() {
	monthAndYear.textContent = format(date, 'MMMM yyyy');
}

function displayCurrentMonth() {
	monthAndYear.textContent = format(new Date(), 'MMMM yyyy');
}

function setCalendarMonth() {
	const dateInterval = setCalendarInterval();
	const intevalLength = dateInterval.length;
	for (let i = 0; i < intevalLength; i++) {
		if (!isSameMonth(dateInterval[i], date)) {
			dates[i].classList.add('other-month-date');
		} else {
			dates[i].classList.remove('other-month-date');
		}
		if (isToday(dateInterval[i])) {
			dates[i].classList.add('today');
		} else {
			dates[i].classList.remove('today');
		}
		dates[i].textContent = getDate(dateInterval[i]);
	}
}

function setCalendarInterval() {
	const prevDays = daysFromPreviousMonth();
	const nextDays = daysFromNextMonth();

	const monthStart = startOfMonth(date);
	const monthEnd = lastDayOfMonth(date);

	const intervalStart = subDays(monthStart, prevDays);
	const intervalEnd = addDays(monthEnd, nextDays);

	const interval = eachDayOfInterval({
		start: new Date(intervalStart),
		end: new Date(intervalEnd),
	});
	return interval;
}

function daysFromPreviousMonth() {
	const daysInweek = 7;
	const firstDay = getDay(startOfMonth(date));
	if (firstDay == 0) {
		return 6;
	}
	const prevMonthDays = (firstDay + 6) % daysInweek;
	return prevMonthDays;
}

function daysFromNextMonth() {
	const daysThisMonth = getDaysInMonth(date);
	const calendarLength = dates.length;
	const nextMonthDays =
		calendarLength - (daysThisMonth + daysFromPreviousMonth());

	return nextMonthDays;
}

function displayCalendar() {
	calendar.classList.add('visible');
	expBtn.classList.add('rotate-up');
	expBtn.classList.remove('rotate-down');
	header.classList.remove('header-only');
}

function hideCalendar() {
	calendar.classList.remove('visible');
	expBtn.classList.remove('rotate-up');
	expBtn.classList.add('rotate-down');
	header.classList.add('header-only');
}
