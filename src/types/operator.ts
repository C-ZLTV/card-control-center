export interface OperatorBranch {
  code: string;
  name: string;
  city: string;
}

export interface OperatorInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  branch: OperatorBranch;
  department: string;
  employeeNumber: string;
  phoneExtension: string;
  locale: string;
  timezone: string;
  permissions: string[];
  lastLogin: string;
}
