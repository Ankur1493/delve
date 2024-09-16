export interface Database {
  host: string;
  version: string;
}

export interface Project {
  id: string;
  organization_id: string;
  name: string;
  region: string;
  created_at: string;
  database: Database;
  status: string;
}

export type ProjectsArray = Project[];

export interface Member {
  user_id: string;
  user_name: string;
  email: string;
  role_name: string;
  mfa_enabled: string;
}

export type MembersArray = Member[]
