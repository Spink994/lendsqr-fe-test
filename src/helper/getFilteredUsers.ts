/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';

/**
|--------------------------------------------------
| Normalise: strip accents, spaces, case
|--------------------------------------------------
*/
const clean = (value: string) =>
	value
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/\s+/g, '');

/**
|--------------------------------------------------
| Build a searchable string for every user
|--------------------------------------------------
*/
const userToSearchable = (u: any) => {
	const joinedDate = dayjs(u.education_and_employment.date_joined).format('MMM DD, YYYY');

	return clean(
		[
			joinedDate,
			u.personal_information.phone_number,
			u.personal_information.email_address,
			u.education_and_employment.organization,
			u.education_and_employment.employment_status,
		].join(' ')
	);
};

/**
|--------------------------------------------------
| Get filtered list
|--------------------------------------------------
*/
export const getFilteredUsers = (users: any[] | undefined, term: string): any[] => {
	if (!users?.length) return [];

	const query = clean(term);

	/**
    |--------------------------------------------------
    | nothing typed ⇒ return all
    |--------------------------------------------------
    */
	if (!query) return users;

	return users.filter((u) => userToSearchable(u).includes(query));
};
