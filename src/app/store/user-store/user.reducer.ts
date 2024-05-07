export const userFeatureKey = 'User Store';

export interface UserState {
  username: string | null;
  email: string | null;
}

export const initialState: UserState = {
  username: null,
  email: null,
};
