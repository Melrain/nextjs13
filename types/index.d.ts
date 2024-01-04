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

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}
