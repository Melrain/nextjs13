export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface TagType {
  name: string;
}
