/**
|--------------------------------------------------
| Npm imports
|--------------------------------------------------
*/
import clsx from 'clsx';
import React from 'react';
import dayjs from 'dayjs';

/**
 |--------------------------------------------------
 | Custom imports
 |--------------------------------------------------
 */
import Field from './Field';
import { UserData } from '@/app/interfaces/user.interface';
import styles from '@/app/styles/pages/dashboard.usersDetails.module.scss';

interface Props {
	user: UserData;
}

export default function GeneralDetails({ user }: Props) {
	/**
    |--------------------------------------------------
    | Rendered View
    |--------------------------------------------------
    */
	return (
		<div className={clsx(styles['panel'])}>
			{/**
            |--------------------------------------------------
            | Personal information
            |--------------------------------------------------
            */}
			<section className={clsx(styles['panel__section'])}>
				<h4>Personal Information</h4>
				<div className={clsx(styles['grid'])}>
					<Field label="Full Name" value={user?.personal_information.full_name} />
					<Field label="Phone Number" value={user?.personal_information.phone_number} />
					<Field label="Email Address" value={user?.personal_information.email_address} />
					<Field label="BVN" value={user?.personal_information.bvn} />
					<Field label="Gender" value={user?.personal_information.gender} />
					<Field label="Marital Status" value={user?.personal_information.marital_status} />
					<Field label="Children" value={user?.personal_information.children} />
					<Field label="Type of Residence" value={user?.personal_information.type_of_residence} />
				</div>
			</section>

			{/**
            |--------------------------------------------------
            | Education & employment
            |--------------------------------------------------
            */}
			<section className={clsx(styles['panel__section'])}>
				<h4>Education and Employment</h4>
				<div className={clsx(styles['grid'])}>
					<Field label="Level of Education" value={user?.education_and_employment.level_of_education} />
					<Field label="Employment Status" value={user?.education_and_employment.employment_status} />
					<Field label="Sector of Employment" value={user?.education_and_employment.sector_of_employment} />
					<Field
						label="Duration of Employment"
						value={user?.education_and_employment.duration_of_employment}
					/>
					<Field label="Office Email" value={user?.education_and_employment.office_email} />
					<Field label="Monthly Income" value={user?.education_and_employment.monthly_income} />
					<Field
						label="Loan Repayment"
						value={`₦${user?.education_and_employment.loan_repayment.toLocaleString()}`}
					/>
					<Field
						label="Date Joined"
						value={dayjs(user?.education_and_employment.date_joined, 'DD/MM/YYYY').format('MMM DD, YYYY')}
					/>
				</div>
			</section>

			{/**
            |--------------------------------------------------
            | Socials
            |--------------------------------------------------
            */}
			<section className={clsx(styles['panel__section'])}>
				<h4>Socials</h4>
				<div className={clsx(styles['grid'])}>
					<Field label="Twitter" value={user?.socials.twitter} />
					<Field label="Facebook" value={user?.socials.facebook} />
					<Field label="Instagram" value={user?.socials.instagram} />
				</div>
			</section>

			{/**
            |--------------------------------------------------
            | Guarantor
            |--------------------------------------------------
            */}
			<section className={clsx(styles['panel__section'], styles['panel__section-no-border'])}>
				<h4>Guarantor</h4>
				<div className={clsx(styles['grid'])}>
					<Field label="Full Name" value={user?.guarantor.full_name} />
					<Field label="Phone Number" value={user?.guarantor.phone_number} />
					<Field label="Email Address" value={user?.guarantor.email_address} />
					<Field label="Relationship" value={user?.guarantor.relationship} />
				</div>
			</section>
		</div>
	);
}
