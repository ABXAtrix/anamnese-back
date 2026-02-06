export default interface IUser {
  id: string;
  name: string;
  credits: number;
  email: string;
  password: string;
  brand_id: string;
  is_brand_owner: boolean;
  created_at: Date;
  updated_at: Date;
}
