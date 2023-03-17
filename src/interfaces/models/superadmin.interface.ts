interface ISuperAdminModel {
  email: string;
  password: string;
  name: string;
  avatar?: string | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export default ISuperAdminModel;
