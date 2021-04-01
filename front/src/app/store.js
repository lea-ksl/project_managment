import { configureStore } from '@reduxjs/toolkit';
//import postsReducer from "../features/posts/postsSlice";
import projectsReducer from "../features/projects/projectsSlice";
import polesReducer from "../features/poles/polesSlice";
import tasksReducer from "../features/tasks/tasksSlice";
//import usersReducer from "../features/users/usersSlice";

export default configureStore({
  reducer: {
    //posts: postsReducer,
    projects: projectsReducer,
    poles:polesReducer,
    tasks:tasksReducer,
    //users: usersReducer
  },
});
