import { configureStore } from '@reduxjs/toolkit';
//import postsReducer from "../features/posts/postsSlice";
import projectsReducer from "../features/projects/projectsSlice";

export default configureStore({
  reducer: {
    //posts: postsReducer,
    projects: projectsReducer,
  },
});
