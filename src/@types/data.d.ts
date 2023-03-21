type UserGuarantorType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
};

type UserProfileType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  gender: string;
  bvn: string;
  address: string;
  currency: string;
};

type SocialsType = {
  facebook: string;
  instagram: string;
  twitter: string;
};

type EducationType = {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
};

export interface IUserDataProps {
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate?: string;
  profile?: UserProfileType;
  guarantor?: UserGuarantorType;
  accountBalance?: string;
  accountNumber?: string;
  id: string;
  socials?: SocialsType;
  education?: EducationType;
  status: string;
}
