export interface FilterControlsProps {
  activeFilter?: string | string[];
  basePath: string;
  searchParams?: {
    page?: string;
    perPage?: string;
  };
}