export interface CreateCategoryDTO {
  name: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;