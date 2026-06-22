export interface createCategoryDTO {
  name: string;
}

export type updateCategoryDTO = Partial<createCategoryDTO>;