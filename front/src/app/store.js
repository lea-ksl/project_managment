import { configureStore } from '@reduxjs/toolkit';
//import postsReducer from "../features/posts/postsSlice";
import projectsReducer from "../features/projects/projectsSlice";
import projectReducer from "../features/projects/projectSlice";
import polesReducer from "../features/poles/polesSlice";
import tasksReducer from "../features/tasks/tasksSlice";
//import usersReducer from "../features/users/usersSlice";

export default configureStore({
  reducer: {
    //posts: postsReducer,
    projects: projectsReducer,
    project: projectReducer,
    poles:polesReducer,
    tasks:tasksReducer,
    //users: usersReducer
  },
});
