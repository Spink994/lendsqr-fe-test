/**
|--------------------------------------------------
| Interface for User Data
|--------------------------------------------------
*/
export interface UserData {
	personal_information: {
		bvn: string;
		gender: string;
		children: string;
		full_name: string;
		phone_number: string;
		email_address: string;
		marital_status: string;
		type_of_residence: string;
	};

	education_and_employment: {
		date_joined: string;
		organization: string;
		office_email: string;
		monthly_income: string;
		loan_repayment: number;
		level_of_education: string;
		employment_status: string;
		sector_of_employment: string;
		duration_of_employment: string;
	};

	socials: {
		twitter: string;
		facebook: string;
		instagram: string;
	};

	guarantor: {
		full_name: string;
		relationship: string;
		phone_number: string;
		email_address: string;
	};
}
