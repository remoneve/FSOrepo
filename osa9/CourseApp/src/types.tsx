interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
interface CoursePartDesc extends CoursePartBase {
    description: string;
  }

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
export interface CoursePartBasic extends CoursePartDesc {
    kind: "basic"
  }
  
export interface CoursePartBackground extends CoursePartDesc {
    backgroundMaterial: string;
    kind: "background"
  }
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;