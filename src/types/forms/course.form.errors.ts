export default interface CourseFormErrors {
  title?: string;
  authorId?: string;
  category?: string;
  onSave?: string;
}

export interface CourseRequiredFields {
  title: string;
  authorId: string;
  category: string;
}

const requiredFields: CourseRequiredFields = {
  title: "",
  authorId: "",
  category: ""
};

export { requiredFields };
